/**
 * Clay MCP Tools
 *
 * Tools for person enrichment, company enrichment, and webhook-based
 * table enrichment via the Clay API.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { clayPost, clayWebhookPost } from "../services/clay-client.js";
import { handleApiError } from "../services/error-handler.js";
import { ResponseFormat } from "../constants.js";
import type { ClayPersonEnrichment, ClayCompanyEnrichment } from "../types.js";

// ─── Schemas ──────────────────────────────────────────────────

const EnrichPersonSchema = z.object({
  email: z.string().optional().describe("Person's email address (primary lookup key)"),
  linkedin_url: z.string().optional().describe("Person's LinkedIn profile URL"),
  first_name: z.string().optional().describe("First name (used with last_name + company for fuzzy match)"),
  last_name: z.string().optional().describe("Last name"),
  company_domain: z.string().optional().describe("Company domain for disambiguation"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

const EnrichCompanySchema = z.object({
  domain: z.string().optional().describe("Company website domain (e.g. 'acme.com') — primary lookup key"),
  company_name: z.string().optional().describe("Company name (used if domain not available)"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

const TriggerWebhookEnrichmentSchema = z.object({
  webhook_url: z.string().url().describe("The Clay webhook URL for the target enrichment table"),
  data: z.record(z.unknown()).describe("Key-value data to send to the webhook (e.g. {email: 'x@y.com', company: 'Acme'})"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

// ─── Helpers ──────────────────────────────────────────────────

function formatPersonMarkdown(p: ClayPersonEnrichment): string {
  return [
    `## ${p.fullName || [p.firstName, p.lastName].filter(Boolean).join(" ") || "Unknown"}`,
    p.jobTitle ? `- **Title**: ${p.jobTitle}` : "",
    p.company ? `- **Company**: ${p.company}` : "",
    p.email ? `- **Email**: ${p.email}` : "",
    p.phone ? `- **Phone**: ${p.phone}` : "",
    p.linkedInUrl ? `- **LinkedIn**: ${p.linkedInUrl}` : "",
    p.location ? `- **Location**: ${p.location}` : "",
    p.bio ? `- **Bio**: ${p.bio.substring(0, 300)}` : "",
    "",
  ].filter(Boolean).join("\n");
}

function formatCompanyMarkdown(c: ClayCompanyEnrichment): string {
  return [
    `## ${c.name || "Unknown Company"}`,
    c.domain ? `- **Domain**: ${c.domain}` : "",
    c.industry ? `- **Industry**: ${c.industry}` : "",
    c.employeeCount ? `- **Employees**: ${c.employeeCount.toLocaleString()}` : "",
    c.revenue ? `- **Revenue**: ${c.revenue}` : "",
    c.foundedYear ? `- **Founded**: ${c.foundedYear}` : "",
    c.location ? `- **Location**: ${c.location}` : "",
    c.fundingTotal ? `- **Total Funding**: ${c.fundingTotal}` : "",
    c.lastFundingRound ? `- **Last Round**: ${c.lastFundingRound}` : "",
    c.description ? `- **Description**: ${c.description.substring(0, 300)}` : "",
    c.techStack?.length ? `- **Tech Stack**: ${c.techStack.join(", ")}` : "",
    "",
  ].filter(Boolean).join("\n");
}

// ─── Tool Registration ────────────────────────────────────────

export function registerClayTools(server: McpServer): void {
  // ── clay_enrich_person ──
  server.registerTool(
    "clay_enrich_person",
    {
      title: "Enrich Person with Clay",
      description: `Enrich a person's profile using Clay's data network — returns job title, company, email, phone, LinkedIn, location, and bio.

Provide at least one of: email, linkedin_url, or first_name + last_name + company_domain.

Args:
  - email (string, optional): Person's email (best lookup key)
  - linkedin_url (string, optional): LinkedIn profile URL
  - first_name / last_name (string, optional): Name for fuzzy matching
  - company_domain (string, optional): Company domain for disambiguation
  - response_format ('markdown' | 'json')

Returns: Full name, title, company, email, phone, LinkedIn, location, bio.

Examples:
  - "Enrich john@acme.com" -> email='john@acme.com'
  - "Find info on Jane Doe at acme.com" -> first_name='Jane', last_name='Doe', company_domain='acme.com'`,
      inputSchema: EnrichPersonSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        if (!params.email && !params.linkedin_url && !(params.first_name && params.last_name)) {
          return {
            content: [{ type: "text" as const, text: "Error: Provide at least email, linkedin_url, or first_name + last_name." }],
            isError: true,
          };
        }

        const body: Record<string, unknown> = {};
        if (params.email) body.email = params.email;
        if (params.linkedin_url) body.linkedinUrl = params.linkedin_url;
        if (params.first_name) body.firstName = params.first_name;
        if (params.last_name) body.lastName = params.last_name;
        if (params.company_domain) body.companyDomain = params.company_domain;

        const data = await clayPost<ClayPersonEnrichment>("/people/enrich", body);

        if (!data || (!data.fullName && !data.email)) {
          return { content: [{ type: "text" as const, text: "No enrichment data found for this person." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
        }

        return { content: [{ type: "text" as const, text: `# Person Enrichment\n\n${formatPersonMarkdown(data)}` }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "Clay") }], isError: true };
      }
    }
  );

  // ── clay_enrich_company ──
  server.registerTool(
    "clay_enrich_company",
    {
      title: "Enrich Company with Clay",
      description: `Enrich a company profile using Clay's data network — returns industry, employee count, revenue, tech stack, funding, and description.

Provide domain (preferred) or company_name.

Args:
  - domain (string, optional): Company website domain (best lookup key)
  - company_name (string, optional): Company name (fallback)
  - response_format ('markdown' | 'json')

Returns: Company name, domain, industry, employees, revenue, founded, location, funding, tech stack, description.

Examples:
  - "Enrich acme.com" -> domain='acme.com'
  - "Get info on Acme Corp" -> company_name='Acme Corp'`,
      inputSchema: EnrichCompanySchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        if (!params.domain && !params.company_name) {
          return {
            content: [{ type: "text" as const, text: "Error: Provide either domain or company_name." }],
            isError: true,
          };
        }

        const body: Record<string, unknown> = {};
        if (params.domain) body.domain = params.domain;
        if (params.company_name) body.companyName = params.company_name;

        const data = await clayPost<ClayCompanyEnrichment>("/companies/enrich", body);

        if (!data || (!data.name && !data.domain)) {
          return { content: [{ type: "text" as const, text: "No enrichment data found for this company." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
        }

        return { content: [{ type: "text" as const, text: `# Company Enrichment\n\n${formatCompanyMarkdown(data)}` }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "Clay") }], isError: true };
      }
    }
  );

  // ── clay_trigger_enrichment ──
  server.registerTool(
    "clay_trigger_enrichment",
    {
      title: "Trigger Clay Table Enrichment",
      description: `Send data to a Clay webhook to trigger a table-based enrichment workflow.

Clay tables run custom enrichment sequences (waterfall emails, phone lookups, intent signals, etc.).
The webhook URL is unique to each Clay table — get it from your Clay table settings.

Args:
  - webhook_url (string): The Clay webhook URL for the enrichment table
  - data (object): Key-value pairs to send (e.g. { "email": "john@acme.com", "company": "Acme" })
  - response_format ('markdown' | 'json')

Returns: Confirmation that data was submitted. Enrichment runs asynchronously — results appear in your Clay table.

Examples:
  - Trigger enrichment: webhook_url='https://...', data={"email":"john@acme.com","name":"John Doe"}`,
      inputSchema: TriggerWebhookEnrichmentSchema,
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async (params) => {
      try {
        const result = await clayWebhookPost<Record<string, unknown>>(
          params.webhook_url,
          params.data as Record<string, unknown>
        );

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ status: "submitted", webhook: params.webhook_url, data: params.data, response: result }, null, 2) }] };
        }

        return {
          content: [{
            type: "text" as const,
            text: [
              "# Clay Enrichment Triggered\n",
              `**Webhook**: ${params.webhook_url}`,
              `**Data Sent**: ${JSON.stringify(params.data)}`,
              "",
              "Data has been submitted to the Clay table. Enrichment runs asynchronously — check your Clay table for results.",
            ].join("\n"),
          }],
        };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "Clay") }], isError: true };
      }
    }
  );
}
