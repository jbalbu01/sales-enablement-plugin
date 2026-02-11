/**
 * Shared constants for the Sales Intelligence MCP server.
 */

// API Base URLs
export const GONG_API_BASE_URL = "https://api.gong.io/v2";
export const ZOOMINFO_API_BASE_URL = "https://api.zoominfo.com";
export const CLAY_API_BASE_URL = "https://api.clay.com/v3";

// Response limits
export const CHARACTER_LIMIT = 25000;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Timeouts (ms)
export const API_TIMEOUT = 30000;

// Response format enum
export enum ResponseFormat {
  MARKDOWN = "markdown",
  JSON = "json"
}
