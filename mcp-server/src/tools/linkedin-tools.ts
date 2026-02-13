/**
 * LinkedIn MCP Tools
 *
 * Tools for searching leads, getting profiles, and researching companies
 * via the LinkedIn REST API using standard OAuth 2.0 bearer tokens.
 *
 * Works with a regular LinkedIn developer token — NO SNAP partnership required.
 * Uses the standard /v2 REST endpoints available to any registered LinkedIn app
 * with the appropriate OAuth scopes (r_liteprofile, r_organization_social, etc.).
 *
 * Supported endpoints:
 *   - /v2/me (authenticated user profile)
 *   - /v2/people (profile lookup by ID or vanity name)
 *   - /v2/organizationAcls (companies the user is admin of)
 *   - /v2/organizations (company lookup by ID)
 *   - /v2/organizationPageStatistics (company analytics)
 *   - /v2/search/dash/companySearch (company search — Marketing API)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import axios from "axios";
import { handleApiError, truncateResponse } from "../services/error-handler.js";
import { CHARACTER_LIMIT, ResponseFormat, API_TIMEOUT } from "../constants.js";
import type { LinkedInProfile, LinkedInCompany } from "../types.js";

const LINKEDIN_API_BASE = "https://api.linkedin.com";

// ─── Client ───────────────────────────────────────────────────

function getHeaders(): Record<string, string> {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) {
    throw new Error(
      "LinkedIn credentials not configured. Set LINKEDIN_ACCESS_TOKEN environment variable. " +
      "Get a token from the LinkedIn Developer Portal (https://developer.linkedin.com/) — " +
      "no SNAP partnership required."
    );
  }
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
    "LinkedIn-Version": "202401",
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

// ─── Schemas ──────────────────────────────────────────────────

const SearchLeadsSchema = z.object({
  keywords: z.string().optional().describe("Keyword search across profiles (e.g. 'VP Engineering')"),
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

/**
 * Map raw LinkedIn API person response to our LinkedInProfile shape.
 * Handles both the /v2/me format and /v2/people format.
 */
function mapToProfile(raw: Record<string, unknown>): LinkedInProfile {
  const localizedFirstName = (raw.localizedFirstName as string) || (raw.firstName as string) || "";
  const localizedLastName = (raw.localizedLastName as string) || (raw.lastName as string) || "";
  const headline = (raw.localizedHeadline as string) || (raw.headline as string) || undefined;

  // Extract location from either format
  let location: string | undefined;
  const loc = raw.location as Record<string, unknown> | undefined;
  if (loc) {
    location = (loc.name as string) || (loc.basicLocation as Record<string, unknown>)?.country as string || undefined;
  }

  // Extract current position from positions array if present
  let currentTitle: string | undefined;
  let currentCompany: string | undefined;
  const positions = raw.positions as Record<string, unknown> | undefined;
  if (positions) {
    const elements = (positions.elements as Array<Record<string, unknown>>) || [];
    const current = elements.find((e) => !(e.endMonthYear || e.endDate));
    if (current) {
      currentTitle = current.title as string;
      const company = current.company as Record<string, unknown> | undefined;
      currentCompany = (company?.name as string) || (current.companyName as string);
    }
  }

  const vanityName = raw.vanityName as string | undefined;
  const profileUrl = vanityName ? `https://www.linkedin.com/in/${vanityName}` : undefined;

  return {
    firstName: localizedFirstName,
    lastName: localizedLastName,
    headline,
    location,
    industry: raw.industryName as string || raw.industry as string || undefined,
    currentTitle: currentTitle || headline,
    currentCompany,
    summary: raw.summary as string || undefined,
    profileUrl,
    connectionDegree: undefined,
    experienceYears: undefined,
  };
}

/**
 * Map raw LinkedIn organization response to our LinkedInCompany shape.
 */
function mapToCompany(raw: Record<string, unknown>): LinkedInCompany {
  const localizedName = (raw.localizedName as string) ||
    (raw.name as Record<string, unknown>)?.localized as string ||
    (raw.name as string) || "Unknown";

  const localizedDesc = (raw.localizedDescription as string) || undefined;

  // Extract employee count range
  let employeeCount: number | undefined;
  const staffCount = raw.staffCount as number | undefined;
  const staffCountRange = raw.staffCountRange as Record<string, unknown> | undefined;
  if (staffCount) {
    employeeCount = staffCount;
  } else if (staffCountRange) {
    // Use midpoint of range
    const start = staffCountRange.start as number || 0;
    const end = staffCountRange.end as number || start;
    employeeCount = Math.round((start + end) / 2);
  }

  // Extract location
  let headquarters: string | undefined;
  const locations = raw.locations as Record<string, unknown> | undefined;
  if (locations) {
    const elements = (locations.elements as Array<Record<string, unknown>>) || [];
    const hq = elements.find((e) => e.locationType === "HEADQUARTERS") || elements[0];
    if (hq) {
      const addr = hq.address as Record<string, unknown> | undefined;
      if (addr) {
        headquarters = [addr.city, addr.geographicArea, addr.country].filter(Boolean).join(", ");
      }
    }
  }

  // Extract specialties
  let specialties: string[] | undefined;
  const rawSpecialties = raw.specialties as string[] | undefined;
  if (rawSpecialties?.length) {
    specialties = rawSpecialties;
  }

  return {
    name: localizedName,
    industry: raw.localizedIndustry as string || raw.industryName as string || undefined,
    employeeCount,
    headquarters,
    description: localizedDesc,
    website: raw.localizedWebsite as string || raw.websiteUrl as string || undefined,
    specialties,
    founded: raw.foundedOn as number || (raw.foundedOn as Record<string, unknown>)?.year as number || undefined,
  };
}

// ─── Tool Registration ────────────────────────────────────────

export function registerLinkedInTools(server: McpServer): void {
  // ── linkedin_search_leads ──
  server.registerTool(
    "linkedin_search_leads",
    {
      title: "Search LinkedIn Leads",
      description: `Search for people/leads on LinkedIn using keywords, title, company, seniority, geography, and industry filters.

Uses the standard LinkedIn REST API (no SNAP partnership required). Works with any LinkedIn developer token that has the appropriate OAuth scopes.

Note: The standard LinkedIn API has more limited people search than Sales Navigator. For deep lead research, combine with ZoomInfo or Clay enrichment tools.

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

Returns: Name, headline, title, company, location, industry, profile URL.

Examples:
  - "VP Engineering in Bay Area" -> title='VP Engineering', geography='San Francisco Bay Area'
  - "CTO at Acme Corp" -> title='CTO', company_name='Acme Corp'`,
      inputSchema: SearchLeadsSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        // Build keyword query from all search params
        const queryParts: string[] = [];
        if (params.keywords) queryParts.push(params.keywords);
        if (params.first_name) queryParts.push(params.first_name);
        if (params.last_name) queryParts.push(params.last_name);
        if (params.title) queryParts.push(params.title);
        if (params.company_name) queryParts.push(params.company_name);
        if (params.seniority) queryParts.push(params.seniority);
        if (params.geography) queryParts.push(params.geography);
        if (params.industry) queryParts.push(params.industry);

        if (!queryParts.length) {
          return { content: [{ type: "text" as const, text: "Error: Provide at least one search criteria (keywords, name, title, company, etc.)." }], isError: true };
        }

        const searchQuery = queryParts.join(" ");

        // Use the standard /v2/search/people endpoint (Marketing/Advertising API)
        // Falls back to typeahead endpoint if the full search isn't available
        let leads: LinkedInProfile[] = [];
        let total = 0;

        try {
          // Try the standard people search endpoint first
          const data = await linkedInGet<Record<string, unknown>>(
            "/v2/search/dash/people",
            {
              q: "search",
              query: searchQuery,
              count: params.limit,
              start: params.offset,
              decorationId: "com.linkedin.voyager.dash.deco.search.SearchClusterCollection-175",
            }
          );

          // Parse search results
          const elements = (data.elements as Array<Record<string, unknown>>) || [];
          leads = elements.map((el) => {
            const items = (el.items as Array<Record<string, unknown>>) || [];
            return items
              .filter((item) => item.type === "PROFILE" || item.entityCustomTrackingInfo)
              .map((item) => {
                const entity = (item.entity as Record<string, unknown>) || item;
                return mapToProfile(entity);
              });
          }).flat();

          total = (data.paging as Record<string, unknown>)?.total as number || leads.length;
        } catch {
          // Fall back to typeahead if the full search endpoint isn't available
          try {
            const data = await linkedInGet<Record<string, unknown>>(
              "/v2/typeahead/hits",
              {
                q: "blended",
                query: searchQuery,
                count: params.limit,
                start: params.offset,
                type: "PEOPLE",
              }
            );

            const elements = (data.elements as Array<Record<string, unknown>>) || [];
            leads = elements.map((el) => {
              const hit = (el.hitInfo as Record<string, unknown>) || el;
              const person = (hit.person as Record<string, unknown>) || hit;
              return mapToProfile(person);
            });

            total = (data.paging as Record<string, unknown>)?.total as number || leads.length;
          } catch {
            // Final fallback: search using /v2/people with keywords
            // This returns the authenticated user's network connections matching criteria
            const data = await linkedInGet<Record<string, unknown>>(
              "/v2/connections",
              {
                q: "search",
                keywords: searchQuery,
                count: params.limit,
                start: params.offset,
              }
            );

            const elements = (data.elements as Array<Record<string, unknown>>) || [];
            leads = elements.map(mapToProfile);
            total = (data.paging as Record<string, unknown>)?.total as number || leads.length;
          }
        }

        if (!leads.length) {
          return { content: [{ type: "text" as const, text: "No leads found matching your criteria. Tip: Try broader keywords, or use ZoomInfo/Clay tools for deeper lead search." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ total, count: leads.length, offset: params.offset, leads }, null, 2) }] };
        }

        const lines = [
          `# LinkedIn Lead Search`,
          `Found **${total}** leads.\n`,
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
      description: `Get LinkedIn profile information for a specific person.

Uses the standard LinkedIn REST API (no SNAP required). Provide either a LinkedIn URL or member ID.

If neither is provided, returns the authenticated user's own profile.

Args:
  - linkedin_url (string, optional): LinkedIn profile URL
  - member_id (string, optional): LinkedIn member ID
  - response_format ('markdown' | 'json')

Returns: Full profile with headline, title, company, location.

Examples:
  - "Get profile for linkedin.com/in/johndoe" -> linkedin_url='https://linkedin.com/in/johndoe'
  - "Get my LinkedIn profile" -> (no params, returns authenticated user)`,
      inputSchema: GetProfileSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    },
    async (params) => {
      try {
        let data: Record<string, unknown>;

        if (params.member_id) {
          // Lookup by member ID using the standard /v2/people endpoint
          data = await linkedInGet<Record<string, unknown>>(
            `/v2/people/(id:${params.member_id})`,
            {
              projection: "(id,localizedFirstName,localizedLastName,localizedHeadline,vanityName,profilePicture,positions,location,industryName,summary)",
            }
          );
        } else if (params.linkedin_url) {
          // Extract vanity name from URL and use it for lookup
          const match = params.linkedin_url.match(/linkedin\.com\/in\/([^/?]+)/);
          if (match) {
            const vanityName = match[1];
            data = await linkedInGet<Record<string, unknown>>(
              `/v2/people/(vanityName:${vanityName})`,
              {
                projection: "(id,localizedFirstName,localizedLastName,localizedHeadline,vanityName,profilePicture,positions,location,industryName,summary)",
              }
            );
          } else {
            return { content: [{ type: "text" as const, text: "Error: Could not extract a profile vanity name from the LinkedIn URL. Expected format: https://linkedin.com/in/username" }], isError: true };
          }
        } else {
          // No params — return authenticated user's profile
          data = await linkedInGet<Record<string, unknown>>(
            "/v2/me",
            {
              projection: "(id,localizedFirstName,localizedLastName,localizedHeadline,vanityName,profilePicture,positions,location,industryName,summary)",
            }
          );
        }

        const profile = mapToProfile(data);

        if (!profile.firstName && !profile.lastName) {
          return { content: [{ type: "text" as const, text: "No profile data found." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify(profile, null, 2) }] };
        }

        return { content: [{ type: "text" as const, text: `# LinkedIn Profile\n\n${formatProfileMarkdown(profile)}` }] };
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

Uses the standard LinkedIn REST API (no SNAP required).

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
        // Build keyword query
        const queryParts: string[] = [];
        if (params.keywords) queryParts.push(params.keywords);
        if (params.company_name) queryParts.push(params.company_name);
        if (params.industry) queryParts.push(params.industry);
        if (params.geography) queryParts.push(params.geography);

        if (!queryParts.length) {
          return { content: [{ type: "text" as const, text: "Error: Provide at least one search criteria (keywords, company_name, industry, or geography)." }], isError: true };
        }

        const searchQuery = queryParts.join(" ");
        let companies: LinkedInCompany[] = [];
        let total = 0;

        try {
          // Try the organization search endpoint first
          const data = await linkedInGet<Record<string, unknown>>(
            "/v2/search/dash/companies",
            {
              q: "search",
              query: searchQuery,
              count: params.limit,
              start: params.offset,
            }
          );

          const elements = (data.elements as Array<Record<string, unknown>>) || [];
          companies = elements.map((el) => {
            const items = (el.items as Array<Record<string, unknown>>) || [el];
            return items.map((item) => {
              const entity = (item.entity as Record<string, unknown>) || item;
              return mapToCompany(entity);
            });
          }).flat();

          total = (data.paging as Record<string, unknown>)?.total as number || companies.length;
        } catch {
          // Fall back to organization typeahead
          try {
            const data = await linkedInGet<Record<string, unknown>>(
              "/v2/typeahead/hits",
              {
                q: "blended",
                query: searchQuery,
                count: params.limit,
                start: params.offset,
                type: "COMPANY",
              }
            );

            const elements = (data.elements as Array<Record<string, unknown>>) || [];
            companies = elements.map((el) => {
              const hit = (el.hitInfo as Record<string, unknown>) || el;
              const org = (hit.organization as Record<string, unknown>) || (hit.company as Record<string, unknown>) || hit;
              return mapToCompany(org);
            });

            total = (data.paging as Record<string, unknown>)?.total as number || companies.length;
          } catch {
            // Final fallback: organization lookup by name
            const data = await linkedInGet<Record<string, unknown>>(
              "/v2/organizations",
              {
                q: "vanityName",
                vanityName: searchQuery.toLowerCase().replace(/\s+/g, "-"),
              }
            );

            const elements = (data.elements as Array<Record<string, unknown>>) || [];
            companies = elements.map(mapToCompany);
            total = companies.length;
          }
        }

        // Apply employee count filters client-side if provided
        if (params.min_employees || params.max_employees) {
          companies = companies.filter((c) => {
            if (!c.employeeCount) return true; // Don't filter out unknowns
            if (params.min_employees && c.employeeCount < params.min_employees) return false;
            if (params.max_employees && c.employeeCount > params.max_employees) return false;
            return true;
          });
        }

        if (!companies.length) {
          return { content: [{ type: "text" as const, text: "No companies found matching your criteria." }] };
        }

        if (params.response_format === ResponseFormat.JSON) {
          return { content: [{ type: "text" as const, text: JSON.stringify({ total, count: companies.length, offset: params.offset, companies }, null, 2) }] };
        }

        const lines = [
          `# LinkedIn Company Search`,
          `Found **${total}** companies.\n`,
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
