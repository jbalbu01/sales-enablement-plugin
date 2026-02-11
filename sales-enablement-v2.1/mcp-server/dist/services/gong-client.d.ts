/**
 * Gong API Client
 *
 * Handles authentication and HTTP requests to the Gong REST API (v2).
 * Uses Basic Auth with access key + secret.
 */
export declare function gongGet<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
export declare function gongPost<T>(endpoint: string, data?: Record<string, unknown>): Promise<T>;
export declare function isGongConfigured(): boolean;
//# sourceMappingURL=gong-client.d.ts.map