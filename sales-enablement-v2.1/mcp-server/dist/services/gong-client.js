/**
 * Gong API Client
 *
 * Handles authentication and HTTP requests to the Gong REST API (v2).
 * Uses Basic Auth with access key + secret.
 */
import axios from "axios";
import { GONG_API_BASE_URL, API_TIMEOUT } from "../constants.js";
let client = null;
function getClient() {
    if (client)
        return client;
    const accessKey = process.env.GONG_ACCESS_KEY;
    const accessSecret = process.env.GONG_ACCESS_KEY_SECRET;
    if (!accessKey || !accessSecret) {
        throw new Error("Gong credentials not configured. Set GONG_ACCESS_KEY and GONG_ACCESS_KEY_SECRET environment variables.");
    }
    const encoded = Buffer.from(`${accessKey}:${accessSecret}`).toString("base64");
    client = axios.create({
        baseURL: GONG_API_BASE_URL,
        timeout: API_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Basic ${encoded}`,
        },
    });
    return client;
}
export async function gongGet(endpoint, params) {
    const response = await getClient().get(endpoint, { params });
    return response.data;
}
export async function gongPost(endpoint, data) {
    const response = await getClient().post(endpoint, data);
    return response.data;
}
export function isGongConfigured() {
    return Boolean(process.env.GONG_ACCESS_KEY && process.env.GONG_ACCESS_KEY_SECRET);
}
//# sourceMappingURL=gong-client.js.map