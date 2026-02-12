/**
 * Clay API Client
 *
 * Handles authentication and HTTP requests to the Clay enrichment API.
 * Clay uses API key authentication for enterprise endpoints
 * and webhook-based architecture for table operations.
 */
export declare function clayPost<T>(endpoint: string, data?: Record<string, unknown>): Promise<T>;
export declare function clayGet<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
/**
 * Send data to a Clay webhook for table-based enrichment.
 * Each webhook URL is unique to a table and does not require the base URL.
 */
export declare function clayWebhookPost<T>(webhookUrl: string, data: Record<string, unknown>): Promise<T>;
export declare function isClayConfigured(): boolean;
//# sourceMappingURL=clay-client.d.ts.map