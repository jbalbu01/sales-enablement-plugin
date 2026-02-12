/**
 * ZoomInfo MCP Tools
 *
 * Tools for searching companies, contacts, org charts,
 * and tech stack data via the ZoomInfo API.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { zoomInfoPost } from "../services/zoominfo-client.js";
import { handleApiError, truncateResponse } from "../services/error-handler.js";
import { CHARACTER_LIMIT, ResponseFormat, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "../constants.js";
import type { ZoomInfoCompany, ZoomInfoContact, ZoomInfoOrgChartEntry } from "../types.js";

// ─── Schemas ──────────────────────────────────────────────────

const SearchCompanySchema = z.object({
  company_name: z.string().optional().describe("Company name to search for (partial match)"),
  domain: z.string().optional().describe("Company website domain (e.g. 'acme.com')"),
  industry: z.string().optional().describe("Industry filter (e.g. 'Technology', 'Healthcare')"),
  min_employees: z.number().int().optional().describe("Minimum employee count"),
  max_employees: z.number().int().optional().describe("Maximum employee count"),
  min_revenue: z.number().optional().describe("Minimum annual revenue in USD"),
  country: z.string().optional().describe("Country filter (e.g. 'US', 'United Kingdom')"),
  limit: z.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE)
    .describe("Maximum results to return (default: 20, max: 100)"),
  page: z.number().int().min(1).default(1).describe("Page number for pagination"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

const SearchContactSchema = z.object({
  first_name: z.string().optional().describe("Contact's first name"),
  last_name: z.string().optional().describe("Contact's last name"),
  email: z.string().optional().describe("Contact email address"),
  job_title: z.string().optional().describe("Job title keyword (e.g. 'VP Sales', 'CTO')"),
  management_level: z.string().optional()
    .describe("Management level: 'c-level', 'vp-level', 'director', 'manager', 'staff'"),
  department: z.string().optional()
    .describe("Department filter (e.g. 'Sales', 'Engineering', 'Marketing')"),
  company_name: z.string().optional().describe("Company name to scope the contact search"),
  company_domain: z.string().optional().describe("Company domain to scope the contact search"),
  limit: z.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE)
    .describe("Maximum results to return"),
  page: z.number().int().min(1).default(1).describe("Page number"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

const GetOrgChartSchema = z.object({
  company_id: z.number().int().describe("ZoomInfo company ID (get from zoominfo_search_company first)"),
  department: z.string().optional().describe("Optional department filter (e.g. 'Sales', 'Engineering')"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

const GetTechStackSchema = z.object({
  company_id: z.number().int().optional().describe("ZoomInfo company ID"),
  domain: z.string().optional().describe("Company domain (e.g. 'acme.com')"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

// ─── Helpers ──────────────────────────────────────────────────

function formatCompanyMarkdown(c: ZoomInfoCompany): string {
  return [
    `### ${c.name} (ID: ${c.id})`,
    `- **Website**: ${c.website || "N/A"}`,
    `- **Industry**: ${c.industry || "N/A"}${c.subIndustry ? ` / ${c.subIndustry}` : ""}`,
    `- **Employees**: ${c.employees?.toLocaleString() || "N/A"}`,
    `- **Revenue**: ${c.revenue ? `$${(c.revenue / 1e6).toFixed(1)}M` : c.revenueRange || "N/A"}`,
    `- **Location**: ${[c.city, c.state, c.country].filter(Boolean).join(", ") || "N/A"}`,
    `- **Founded**: ${c.foundedYear || "N/A"}`,
    c.description ? `- **Description**: ${c.description.substring(0, 200)}...` : "",
    "",
  ].filter(Boolean).join("\n");
}

function formatContactMarkdown(c: ZoomInfoContact): string {
  return [
    `### ${c.firstName} ${c.lastName} (ID: ${c.id})`,
    `- **Title**: ${c.jobTitle || "N/A"}`,
    `- **Company**: ${c.companyName || "N/A"}`,
    `- **Email**: ${c.email || "N/A"}`,
    `- **Phone**: ${c.directPhone || c.phone || "N/A"}`,
    `- **Department**: ${c.department || "N/A"}`,
    `- **Level**: ${c.managementLevel || "N/A"}`,
    `- **Location**: ${[c.city, c.state, c.country].filter(Boolean).join(", ") || "N/A"}`,
    c.linkedInUrl ? `- **LinkedIn**: ${c.linkedInUrl}` : "",
    "",
  ].filter(Boolean).join("\n");
}

// ─── Tool Registration ────────────────────────────────────────

export function registerZoomInfoTools(server: McpServer): void {
  // ── zoominfo_search_company ──
  server.registerTool(
    "zoominfo_search_company",
    {
      title: "Search ZoomInfo Companies",
      description: `Search the ZoomInfo database for companies by name, domain, industry, size, or revenue.

Returns firmographic data: employee count, revenue, industry, location, and description.
Use the returned company ID for zoominfo_get_org_chart or zoominfo_get_tech_stack.

Args:
  - company_name (string, optional): Company name (partial match)
  - domain (string, optional): Website domain (e.g. 'acme.com')
  - industry (string, optional): Industry filter
  - min_employees / max_employees (number, optional): Employee count range
  - min_revenue (number, optional): Minimum annual revenue in USD
  - country (string, optional): Country filter
  - limit (number): Max results (default: 20, max: 100)
  - page (number): Page number (default: 1)
  - response_format ('markdown' | 'json')

Returns: Company name, website, industry, employee count, revenue, location, founded year.

Examples:
  - "Find Acme Corp" -> company_name='Acme'
  - "SaaS companies with 500+ employees" -> industry='Technology', min_employees=500`,
      inputSchema: SearchCompanySchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const body: Record<string, unknown> = {
          rpp: params.limit,
          page: params.page,
        };
        if (params.company_name) body.companyName = params.company_name;
        if (params.domain) body.websiteURL = params.domain;
        if (params.industry) body.industry = params.industry;
        if (params.min_employees) body.employeeCountMin = params.min_employees;
        if (params.max_employees) body.employeeCountMax = params.max_employees;
        if (params.min_revenue) body.revenueMin = params.min_revenue;
        if (params.country) body.country = params.country;

        const data = await zoomInfoPost<{
          data: ZoomInfoCompany[];
          maxResults: number;
        }>("/search/company", body);

        const companies = data.data || [];
        if (!companies.length) {
          return { content: [{ type: "text" as const, text: "No companies found matching your criteria." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          const output = {
            total: data.maxResults || companies.length,
            count: companies.length,
            page: params.page,
            companies,
          };
          return { content: [{ type: "text" as const, text: JSON.stringify(output, null, 2) }] };
        }

        const lines = [
          `# ZoomInfo Company Search`,
          `Found **${data.maxResults || companies.length}** companies (page ${params.page}).\n`,
          ...companies.map(formatCompanyMarkdown),
        ];
        return { content: [{ type: "text" as const, text: truncateResponse(lines.join("\n"), CHARACTER_LIMIT) }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "ZoomInfo") }], isError: true };
      }
    }
  );

  // ── zoominfo_search_contact ──
  server.registerTool(
    "zoominfo_search_contact",
    {
      title: "Search ZoomInfo Contacts",
      description: `Search the ZoomInfo database for contacts by name, title, department, company, or management level.

Returns contact details: name, title, email, phone, company, LinkedIn, and location.
Use for prospecting, building contact lists, or enriching CRM records.

Args:
  - first_name / last_name (string, optional): Contact name
  - email (string, optional): Email address
  - job_title (string, optional): Title keyword (e.g. 'VP Sales')
  - management_level (string, optional): 'c-level', 'vp-level', 'director', 'manager', 'staff'
  - department (string, optional): Department (e.g. 'Sales', 'Engineering')
  - company_name / company_domain (string, optional): Scope to a company
  - limit (number): Max results (default: 20)
  - page (number): Page number (default: 1)
  - response_format ('markdown' | 'json')

Returns: Contact name, title, email, phone, department, level, company, location, LinkedIn.

Examples:
  - "Find VP of Sales at Acme" -> job_title='VP Sales', company_name='Acme'
  - "C-level contacts in engineering" -> management_level='c-level', department='Engineering'`,
      inputSchema: SearchContactSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const body: Record<string, unknown> = {
          rpp: params.limit,
          page: params.page,
        };
        if (params.first_name) body.firstName = params.first_name;
        if (params.last_name) body.lastName = params.last_name;
        if (params.email) body.emailAddress = params.email;
        if (params.job_title) body.jobTitle = params.job_title;
        if (params.management_level) body.managementLevel = params.management_level;
        if (params.department) body.department = params.department;
        if (params.company_name) body.companyName = params.company_name;
        if (params.company_domain) body.websiteURL = params.company_domain;

        const data = await zoomInfoPost<{
          data: ZoomInfoContact[];
          maxResults: number;
        }>("/search/contact", body);

        const contacts = data.data || [];
        if (!contacts.length) {
          return { content: [{ type: "text" as const, text: "No contacts found matching your criteria." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ total: data.maxResults, count: contacts.length, page: params.page, contacts }, null, 2) }] };
        }

        const lines = [
          `# ZoomInfo Contact Search`,
          `Found **${data.maxResults || contacts.length}** contacts (page ${params.page}).\n`,
          ...contacts.map(formatContactMarkdown),
        ];
        return { content: [{ type: "text" as const, text: truncateResponse(lines.join("\n"), CHARACTER_LIMIT) }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "ZoomInfo") }], isError: true };
      }
    }
  );

  // ── zoominfo_get_org_chart ──
  server.registerTool(
    "zoominfo_get_org_chart",
    {
      title: "Get ZoomInfo Org Chart",
      description: `Get the organizational chart for a company from ZoomInfo — shows reporting hierarchy, departments, and management levels.

Use zoominfo_search_company first to get the company ID.

Args:
  - company_id (number): ZoomInfo company ID
  - department (string, optional): Filter to a specific department
  - response_format ('markdown' | 'json')

Returns: Hierarchical list of contacts with titles, departments, management levels, and reporting lines.

Examples:
  - "Org chart for company 12345" -> company_id=12345
  - "Engineering leadership at company 12345" -> company_id=12345, department='Engineering'`,
      inputSchema: GetOrgChartSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const body: Record<string, unknown> = { companyId: params.company_id };
        if (params.department) body.department = params.department;

        const data = await zoomInfoPost<{ data: ZoomInfoOrgChartEntry[] }>(
          "/lookup/orgchart",
          body
        );

        const entries = data.data || [];
        if (!entries.length) {
          return { content: [{ type: "text" as const, text: `No org chart data found for company ${params.company_id}.` }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ companyId: params.company_id, entries }, null, 2) }] };
        }

        const lines = [
          `# Org Chart — Company ${params.company_id}`,
          `${entries.length} people found.\n`,
        ];
        for (const e of entries) {
          const reports = e.directReports ? ` (${e.directReports} direct reports)` : "";
          lines.push(`- **${e.firstName} ${e.lastName}** — ${e.jobTitle || "N/A"}${reports}`);
          lines.push(`  Department: ${e.department || "N/A"} | Level: ${e.managementLevel || "N/A"}`);
        }
        return { content: [{ type: "text" as const, text: truncateResponse(lines.join("\n"), CHARACTER_LIMIT) }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "ZoomInfo") }], isError: true };
      }
    }
  );

  // ── zoominfo_get_tech_stack ──
  server.registerTool(
    "zoominfo_get_tech_stack",
    {
      title: "Get ZoomInfo Tech Stack",
      description: `Get the technology stack used by a company — CRM, marketing automation, analytics, cloud infrastructure, etc.

Provide either company_id or domain.

Args:
  - company_id (number, optional): ZoomInfo company ID
  - domain (string, optional): Company domain (e.g. 'acme.com')
  - response_format ('markdown' | 'json')

Returns: List of technologies categorized by type.

Examples:
  - "What tech does acme.com use?" -> domain='acme.com'
  - "Tech stack for company 12345" -> company_id=12345`,
      inputSchema: GetTechStackSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        if (!params.company_id && !params.domain) {
          return { content: [{ type: "text" as const, text: "Error: Provide either company_id or domain." }], isError: true };
        }

        const body: Record<string, unknown> = {};
        if (params.company_id) body.companyId = params.company_id;
        if (params.domain) body.websiteURL = params.domain;

        const data = await zoomInfoPost<{
          data: Array<{ category: string; technology: string; firstDetected?: string }>;
        }>("/lookup/technology", body);

        const techs = data.data || [];
        if (!techs.length) {
          return { content: [{ type: "text" as const, text: "No tech stack data available for this company." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ technologies: techs }, null, 2) }] };
        }

        // Group by category
        const grouped: Record<string, string[]> = {};
        for (const t of techs) {
          const cat = t.category || "Other";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(t.technology);
        }

        const lines = [`# Tech Stack\n`];
        for (const [category, items] of Object.entries(grouped)) {
          lines.push(`## ${category}`);
          for (const item of items) lines.push(`- ${item}`);
          lines.push("");
        }
        return { content: [{ type: "text" as const, text: lines.join("\n") }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "ZoomInfo") }], isError: true };
      }
    }
  );
}
