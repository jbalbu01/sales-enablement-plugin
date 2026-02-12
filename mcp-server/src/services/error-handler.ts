/**
 * Shared error handling for all API clients.
 */

import { AxiosError } from "axios";

export function handleApiError(error: unknown, service: string): string {
  if (error instanceof AxiosError) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || "";

      switch (status) {
        case 400:
          return `${service} Error: Bad request. ${message || "Check your parameters and try again."}`;
        case 401:
          return `${service} Error: Authentication failed. Check your ${service} API credentials in environment variables.`;
        case 403:
          return `${service} Error: Permission denied. Your API key may lack the required scope for this operation.`;
        case 404:
          return `${service} Error: Resource not found. ${message || "Verify the ID or query and try again."}`;
        case 429:
          return `${service} Error: Rate limit exceeded. Please wait before making more requests.`;
        case 500:
        case 502:
        case 503:
          return `${service} Error: Service temporarily unavailable (HTTP ${status}). Please try again in a few minutes.`;
        default:
          return `${service} Error: API request failed with HTTP ${status}. ${message}`;
      }
    }

    if (error.code === "ECONNABORTED") {
      return `${service} Error: Request timed out. The service may be slow — try again or reduce your query scope.`;
    }

    if (error.code === "ECONNREFUSED") {
      return `${service} Error: Connection refused. The service may be down.`;
    }
  }

  if (error instanceof Error) {
    return `${service} Error: ${error.message}`;
  }

  return `${service} Error: An unexpected error occurred.`;
}

/**
 * Truncate a response string if it exceeds the character limit.
 */
export function truncateResponse(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const truncated = text.substring(0, limit - 200);
  return `${truncated}\n\n---\n⚠️ Response truncated (${text.length} chars). Use filters or pagination to narrow results.`;
}
