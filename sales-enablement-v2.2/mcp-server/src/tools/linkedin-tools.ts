/**
 * LinkedIn Sales Navigator MCP Tools
 *
 * Tools for searching leads, getting profiles, and researching companies
 * via the LinkedIn Sales Navigator API (SNAP partner program).
 *
 * NOTE: The LinkedIn Sales Navigator API requires a SNAP partnership.
 * These tools use the Sales Navigator API with OAuth 2.0 bearer tokens.
 * If SNAP access is unavailable, these tools return clear guidance on alternatives.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { handleApiError, truncateResponse } from "../services/error-handler.js";
import { CHARACTER_LIMIT, ResponseFormat, API_TIMEOUT } from "../constants.js";
import type { LinkedInProfile, LinkedInCompany } from "../types.js";

const LINKEDIN_API_BASE = "https://api.linkedin.com/v2";

// ─── Client ───────────────────────────────────────────────────

function getHeaders(): Record<string, string> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "LinkedIn credentials not configured. Set LINKEDIN_ACCESS_TOKEN environment variable. " +
      "Requires LinkedIn SNAP partner access or a LinkedIn Sales Navigator API subscription."
    );
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Restli-Protocol-Version": "2.0.0",
  };
}

async function linkedInGet<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
  const response = await axios.get<T>(`${LINKEDIN_API_BASE}${endpoint}`, {
    params,
    headers: getHeaders(),
    timeout: API_TIMEOUT,
  });
  return response.data;
}

async function linkedInPost<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
  const response = await axios.post<T>(`${LINKEDIN_API_BASE}${endpoint}`, data, {
    headers: getHeaders(),
    timeout: API_TIMEOUT,
  });
  return response.data;
}

// ─── Schemas ──────────────────────────────────────────────────

const SearchLeadsSchema = z.object({
  keywords: z.string().optional().describe("Keyword search across name, title, company (e.g. 'VP Engineering')"),
  first_name: z.string().optional().describe("First name filter"),
  last_name: z.string().optional().describe("Last name filter"),
  title: z.string().optional().describe("Current job title (e.g. 'Chief Technology Officer')"),
  company_name: z.string().optional().describe("Current company name"),
  industry: z.string().optional().describe("Industry code or name"),
  geography: z.string().optional().describe("Geographic region (e.g. 'San Francisco Bay Area')"),
  seniority: z.string().optional()
    .describe("Seniority level: 'owner', 'cxo', 'vp', 'director', 'manager', 'senior', 'entry'"),
  limit: z.number().int().min(1).max(50).default(20).describe("Max results (default: 20)"),
  offset: z.number().int().min(0).default(0).describe("Pagination offset"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

const GetProfileSchema = z.object({
  linkedin_url: z.string().optional().describe("LinkedIn profile URL (e.g. 'https://linkedin.com/in/johndoe')"),
  member_id: z.string().optional().describe("LinkedIn member ID (if known)"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

const SearchCompaniesSchema = z.object({
  keywords: z.string().optional().describe("Keywords for company search"),
  company_name: z.string().optional().describe("Company name"),
  industry: z.string().optional().describe("Industry filter"),
  min_employees: z.number().int().optional().describe("Minimum employee count"),
  max_employees: z.number().int().optional().describe("Maximum employee count"),
  geography: z.string().optional().describe("Headquarters geography"),
  limit: z.number().int().min(1).max(50).default(20).describe("Max results"),
  offset: z.number().int().min(0).default(0).describe("Pagination offset"),
  response_format: z.nativeEnum(ResponseFormat).default(ResponseFormat.MARKDOWN)
    .describe("Output format: 'markdown' or 'json'"),
}).strict();

// ─── Helpers ──────────────────────────────────────────────────

function formatProfileMarkdown(p: LinkedInProfile): string {
  return [
    `### ${p.firstName} ${p.lastName}`,
    p.headline ? `*${p.headline}*` : "",
    p.currentTitle ? `- **Title**: ${p.currentTitle}` : "",
    p.currentCompany ? `- **Company**: ${p.currentCompany}` : "",
    p.location ? `- **Location**: ${p.location}` : "",
    p.industry ? `- **Industry**: ${p.industry}` : "",
    p.connectionDegree ? `- **Connection**: ${p.connectionDegree}° connection` : "",
    p.experienceYears ? `- **Experience**: ${p.experienceYears} years` : "",
    p.profileUrl ? `- **Profile**: ${p.profileUrl}` : "",
    p.summary ? `- **Summary**: ${p.summary.substring(0, 250)}...` : "",
    "",
  ].filter(Boolean).join("\n");
}

function formatCompanyMarkdown(c: LinkedInCompany): string {
  return [
    `### ${c.name}`,
    c.industry ? `- **Industry**: ${c.industry}` : "",
    c.employeeCount ? `- **Employees**: ${c.employeeCount.toLocaleString()}` : "",
    c.headquarters ? `- **HQ**: ${c.headquarters}` : "",
    c.website ? `- **Website**: ${c.website}` : "",
    c.founded ? `- **Founded**: ${c.founded}` : "",
    c.specialties?.length ? `- **Specialties**: ${c.specialties.join(", ")}` : "",
    c.description ? `- **About**: ${c.description.substring(0, 250)}...` : "",
    "",
  ].filter(Boolean).join("\n");
}

// ─── Tool Registration ────────────────────────────────────────

export function registerLinkedInTools(server: McpServer): void {
  // ── linkedin_search_leads ──
  server.registerTool(
    "linkedin_search_leads",
    {
      title: "Search LinkedIn Sales Navigator Leads",
      description: `Search for people/leads using LinkedIn Sales Navigator filters — keywords, title, company, seniority, geography, and industry.

Requires LinkedIn Sales Navigator API access (SNAP partner program).

Args:
  - keywords (string, optional): Free-text search across profiles
  - first_name / last_name (string, optional): Name filters
  - title (string, optional): Job title filter
  - company_name (string, optional): Current company
  - industry (string, optional): Industry
  - geography (string, optional): Location/region
  - seniority (string, optional): 'owner', 'cxo', 'vp', 'director', 'manager', 'senior', 'entry'
  - limit (number): Max results (default: 20)
  - offset (number): Pagination offset
  - response_format ('markdown' | 'json')

Returns: Name, headline, title, company, location, industry, connection degree, profile URL.

Examples:
  - "VP Engineering in Bay Area" -> title='VP Engineering', geography='San Francisco Bay Area'
  - "CTO at Acme Corp" -> title='CTO', company_name='Acme Corp'`,
      inputSchema: SearchLeadsSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const searchParams: Record<string, unknown> = {
          count: params.limit,
          start: params.offset,
        };
        if (params.keywords) searchParams.keywords = params.keywords;
        if (params.first_name) searchParams.firstName = params.first_name;
        if (params.last_name) searchParams.lastName = params.last_name;
        if (params.title) searchParams.title = params.title;
        if (params.company_name) searchParams.currentCompany = params.company_name;
        if (params.industry) searchParams.industry = params.industry;
        if (params.geography) searchParams.geoRegion = params.geography;
        if (params.seniority) searchParams.seniorityLevel = params.seniority;

        const data = await linkedInGet<{
          elements: LinkedInProfile[];
          paging: { total: number; count: number; start: number };
        }>("/salesNavigatorProfiles", searchParams);

        const leads = data.elements || [];
        if (!leads.length) {
          return { content: [{ type: "text" as const, text: "No leads found matching your criteria." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ total: data.paging?.total || leads.length, count: leads.length, offset: params.offset, leads }, null, 2) }] };
        }

        const lines = [
          `# LinkedIn Lead Search`,
          `Found **${data.paging?.total || leads.length}** leads.\n`,
          ...leads.map(formatProfileMarkdown),
        ];
        return { content: [{ type: "text" as const, text: truncateResponse(lines.join("\n"), CHARACTER_LIMIT) }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "LinkedIn") }], isError: true };
      }
    }
  );

  // ── linkedin_get_profile ──
  server.registerTool(
    "linkedin_get_profile",
    {
      title: "Get LinkedIn Profile",
      description: `Get detailed LinkedIn profile information for a specific person.

Provide either linkedin_url or member_id.

Args:
  - linkedin_url (string, optional): LinkedIn profile URL
  - member_id (string, optional): LinkedIn member ID
  - response_format ('markdown' | 'json')

Returns: Full profile with headline, title, company, location, experience, summary.

Examples:
  - "Get profile for linkedin.com/in/johndoe" -> linkedin_url='https://linkedin.com/in/johndoe'`,
      inputSchema: GetProfileSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        if (!params.linkedin_url && !params.member_id) {
          return { content: [{ type: "text" as const, text: "Error: Provide either linkedin_url or member_id." }], isError: true };
        }

        const lookupParams: Record<string, unknown> = {};
        if (params.member_id) {
          lookupParams.memberId = params.member_id;
        } else if (params.linkedin_url) {
          // Extract vanity name from URL
          const match = params.linkedin_url.match(/linkedin\.com\/in\/([^/?]+)/);
          if (match) lookupParams.vanityName = match[1];
          else lookupParams.profileUrl = params.linkedin_url;
        }

        const data = await linkedInGet<LinkedInProfile>(
          "/salesNavigatorProfiles/lookup",
          lookupParams
        );

        if (!data || (!data.firstName && !data.lastName)) {
          return { content: [{ type: "text" as const, text: "No profile data found." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
        }

        return { content: [{ type: "text" as const, text: `# LinkedIn Profile\n\n${formatProfileMarkdown(data)}` }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "LinkedIn") }], isError: true };
      }
    }
  );

  // ── linkedin_search_companies ──
  server.registerTool(
    "linkedin_search_companies",
    {
      title: "Search LinkedIn Companies",
      description: `Search for companies on LinkedIn by name, industry, size, or geography.

Args:
  - keywords (string, optional): Free-text company search
  - company_name (string, optional): Company name
  - industry (string, optional): Industry filter
  - min_employees / max_employees (number, optional): Size range
  - geography (string, optional): HQ location
  - limit (number): Max results (default: 20)
  - offset (number): Pagination offset
  - response_format ('markdown' | 'json')

Returns: Company name, industry, size, HQ, website, specialties, description.

Examples:
  - "SaaS companies in San Francisco" -> keywords='SaaS', geography='San Francisco'
  - "Find Acme Corp on LinkedIn" -> company_name='Acme Corp'`,
      inputSchema: SearchCompaniesSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        const searchParams: Record<string, unknown> = {
          count: params.limit,
          start: params.offset,
        };
        if (params.keywords) searchParams.keywords = params.keywords;
        if (params.company_name) searchParams.companyName = params.company_name;
        if (params.industry) searchParams.industry = params.industry;
        if (params.min_employees) searchParams.staffCountMin = params.min_employees;
        if (params.max_employees) searchParams.staffCountMax = params.max_employees;
        if (params.geography) searchParams.geoRegion = params.geography;

        const data = await linkedInGet<{
          elements: LinkedInCompany[];
          paging: { total: number; count: number; start: number };
        }>("/salesNavigatorCompanies", searchParams);

        const companies = data.elements || [];
        if (!companies.length) {
          return { content: [{ type: "text" as const, text: "No companies found matching your criteria." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ total: data.paging?.total || companies.length, count: companies.length, offset: params.offset, companies }, null, 2) }] };
        }

        const lines = [
          `# LinkedIn Company Search`,
          `Found **${data.paging?.total || companies.length}** companies.\n`,
          ...companies.map(formatCompanyMarkdown),
        ];
        return { content: [{ type: "text" as const, text: truncateResponse(lines.join("\n"), CHARACTER_LIMIT) }] };
      } catch (error) {
        return { content: [{ type: "text" as const, text: handleApiError(error, "LinkedIn") }], isError: true };
      }
    }
  );
}

export function isLinkedInConfigured(): boolean {
  return Boolean(process.env.LINKEDIN_ACCESS_TOKEN);
}
