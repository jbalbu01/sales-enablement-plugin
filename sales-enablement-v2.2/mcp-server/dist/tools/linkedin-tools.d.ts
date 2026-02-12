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
export declare function registerLinkedInTools(server: McpServer): void;
export declare function isLinkedInConfigured(): boolean;
//# sourceMappingURL=linkedin-tools.d.ts.map