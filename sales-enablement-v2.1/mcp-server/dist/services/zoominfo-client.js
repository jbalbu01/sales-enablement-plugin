/**
 * ZoomInfo API Client
 *
 * Handles JWT authentication and HTTP requests to the ZoomInfo API.
 * Uses client ID + private key to generate JWT tokens.
 */
import axios from "axios";
import { ZOOMINFO_API_BASE_URL, API_TIMEOUT } from "../constants.js";
let client = null;
let jwtToken = null;
let tokenExpiry = 0;
async function authenticate() {
    const clientId = process.env.ZOOMINFO_CLIENT_ID;
    const privateKey = process.env.ZOOMINFO_PRIVATE_KEY;
    if (!clientId || !privateKey) {
        throw new Error("ZoomInfo credentials not configured. Set ZOOMINFO_CLIENT_ID and ZOOMINFO_PRIVATE_KEY environment variables.");
    }
    const response = await axios.post(`${ZOOMINFO_API_BASE_URL}/authenticate`, { clientId, privateKey }, { timeout: API_TIMEOUT, headers: { "Content-Type": "application/json" } });
    jwtToken = response.data.jwt;
    // JWT tokens are valid for 60 minutes; refresh at 55 minutes
    tokenExpiry = Date.now() + 55 * 60 * 1000;
    return jwtToken;
}
async function getToken() {
    if (jwtToken && Date.now() < tokenExpiry) {
        return jwtToken;
    }
    return authenticate();
}
function getClient() {
    if (client)
        return client;
    client = axios.create({
        baseURL: ZOOMINFO_API_BASE_URL,
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    });
    // Intercept requests to inject fresh JWT
    client.interceptors.request.use(async (config) => {
        const token = await getToken();
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
    return client;
}
export async function zoomInfoPost(endpoint, data) {
    const response = await getClient().post(endpoint, data);
    return response.data;
}
export async function zoomInfoGet(endpoint, params) {
    const response = await getClient().get(endpoint, { params });
    return response.data;
}
export function isZoomInfoConfigured() {
    return Boolean(process.env.ZOOMINFO_CLIENT_ID && process.env.ZOOMINFO_PRIVATE_KEY);
}
//# sourceMappingURL=zoominfo-client.js.map