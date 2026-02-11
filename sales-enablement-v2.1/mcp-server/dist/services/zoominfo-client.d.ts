/**
 * ZoomInfo API Client
 *
 * Handles JWT authentication and HTTP requests to the ZoomInfo API.
 * Uses client ID + private key to generate JWT tokens.
 */
export declare function zoomInfoPost<T>(endpoint: string, data?: Record<string, unknown>): Promise<T>;
export declare function zoomInfoGet<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
export declare function isZoomInfoConfigured(): boolean;
//# sourceMappingURL=zoominfo-client.d.ts.map