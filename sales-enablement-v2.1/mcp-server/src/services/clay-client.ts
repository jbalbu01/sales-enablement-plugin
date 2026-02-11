/**
 * Clay API Client
 *
 * Handles authentication and HTTP requests to the Clay enrichment API.
 * Clay uses API key authentication for enterprise endpoints
 * and webhook-based architecture for table operations.
 */

import axios, { AxiosInstance } from "axios";
import { CLAY_API_BASE_URL, API_TIMEOUT } from "../constants.js";

let client: AxiosInstance | null = null;

function getClient(): AxiosInstance {
  if (client) return client;

  const apiKey = process.env.CLAY_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Clay credentials not configured. Set CLAY_API_KEY environment variable."
    );
  }

  client = axios.create({
    baseURL: CLAY_API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  });

  return client;
}

export async function clayPost<T>(
  endpoint: string,
  data?: Record<string, unknown>
): Promise<T> {
  const response = await getClient().post<T>(endpoint, data);
  return response.data;
}

export async function clayGet<T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> {
  const response = await getClient().get<T>(endpoint, { params });
  return response.data;
}

/**
 * Send data to a Clay webhook for table-based enrichment.
 * Each webhook URL is unique to a table and does not require the base URL.
 */
export async function clayWebhookPost<T>(
  webhookUrl: string,
  data: Record<string, unknown>
): Promise<T> {
  const apiKey = process.env.CLAY_API_KEY;
  const response = await axios.post<T>(webhookUrl, data, {
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { "x-clay-webhook-auth": apiKey } : {}),
    },
  });
  return response.data;
}

export function isClayConfigured(): boolean {
  return Boolean(process.env.CLAY_API_KEY);
}
