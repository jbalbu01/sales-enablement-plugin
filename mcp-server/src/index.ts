#!/usr/bin/env node
/**
 * Sales Intelligence MCP Server
 *
 * A unified MCP server for sales teams that integrates:
 * - Gong: Call recordings, transcripts, analytics, and coaching data
 * - ZoomInfo: Company firmographics, contact data, org charts, tech stacks
 * - Clay: Person and company enrichment via data waterfalls
 * - LinkedIn Sales Navigator: Lead search, profiles, and company research
 *
 * Each service registers its tools independently — you only need API keys
 * for the services you want to use. Tools gracefully error with setup
 * instructions when credentials are missing.
 *
 * Transport: stdio (for local Claude Desktop / Claude Code integration)
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerGongTools } from "./tools/gong-tools.js";
import { registerZoomInfoTools } from "./tools/zoominfo-tools.js";
import { registerClayTools } from "./tools/clay-tools.js";
import { registerLinkedInTools } from "./tools/linkedin-tools.js";

// ─── Server Initialization ────────────────────────────────────

const server = new McpServer({
  name: "sales-intelligence-mcp-server",
  version: "1.0.0",
});

// ─── Register All Tool Groups ─────────────────────────────────

// Gong: 5 tools — search calls, get transcript, get call details, search by participant, call stats
registerGongTools(server);

// ZoomInfo: 4 tools — search companies, search contacts, get org chart, get tech stack
registerZoomInfoTools(server);

// Clay: 3 tools — enrich person, enrich company, trigger webhook enrichment
registerClayTools(server);

// LinkedIn: 3 tools — search leads, get profile, search companies
registerLinkedInTools(server);

// ─── Status Tool ──────────────────────────────────────────────

import { z } from "zod";
import { isGongConfigured } from "./services/gong-client.js";
import { isZoomInfoConfigured } from "./services/zoominfo-client.js";
import { isClayConfigured } from "./services/clay-client.js";
import { isLinkedInConfigured } from "./tools/linkedin-tools.js";

server.registerTool(
  "sales_intel_status",
  {
    title: "Sales Intelligence Status",
    description: `Check which sales intelligence services are configured and available.

Returns the configuration status of each integrated service (Gong, ZoomInfo, Clay, LinkedIn).
Use this to verify which tools are ready to use before running queries.

Args: None

Returns: Status of each service (configured/not configured) with required environment variables.`,
    inputSchema: {},
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  },
  async () => {
    const services = [
      {
        name: "Gong",
        configured: isGongConfigured(),
        tools: ["gong_search_calls", "gong_get_transcript", "gong_get_call_details", "gong_search_calls_by_participant", "gong_get_call_stats"],
        envVars: ["GONG_ACCESS_KEY", "GONG_ACCESS_KEY_SECRET"],
      },
      {
        name: "ZoomInfo",
        configured: isZoomInfoConfigured(),
        tools: ["zoominfo_search_company", "zoominfo_search_contact", "zoominfo_get_org_chart", "zoominfo_get_tech_stack"],
        envVars: ["ZOOMINFO_CLIENT_ID", "ZOOMINFO_PRIVATE_KEY"],
      },
      {
        name: "Clay",
        configured: isClayConfigured(),
        tools: ["clay_enrich_person", "clay_enrich_company", "clay_trigger_enrichment"],
        envVars: ["CLAY_API_KEY"],
      },
      {
        name: "LinkedIn Sales Navigator",
        configured: isLinkedInConfigured(),
        tools: ["linkedin_search_leads", "linkedin_get_profile", "linkedin_search_companies"],
        envVars: ["LINKEDIN_ACCESS_TOKEN"],
      },
    ];

    const lines = ["# Sales Intelligence — Service Status\n"];
    let configuredCount = 0;

    for (const svc of services) {
      const status = svc.configured ? "✅ Connected" : "❌ Not Configured";
      if (svc.configured) configuredCount++;
      lines.push(`## ${svc.name} — ${status}`);
      lines.push(`**Tools**: ${svc.tools.join(", ")}`);
      if (!svc.configured) {
        lines.push(`**Setup**: Set these environment variables: \`${svc.envVars.join("`, `")}\``);
      }
      lines.push("");
    }

    lines.push(`---\n**${configuredCount}/${services.length}** services connected. **${services.reduce((sum, s) => sum + s.tools.length, 0)}** tools registered.`);

    return { content: [{ type: "text" as const, text: lines.join("\n") }] };
  }
);

// ─── Start Server ─────────────────────────────────────────────

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Sales Intelligence MCP server running via stdio");
  console.error(`Services: Gong=${isGongConfigured() ? "✓" : "✗"} ZoomInfo=${isZoomInfoConfigured() ? "✓" : "✗"} Clay=${isClayConfigured() ? "✓" : "✗"} LinkedIn=${isLinkedInConfigured() ? "✓" : "✗"}`);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
