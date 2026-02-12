/**
 * Gong API Client
 *
 * Handles authentication and HTTP requests to the Gong REST API (v2).
 * Uses Basic Auth with access key + secret.
 */

import axios, { AxiosInstance } from "axios";
import { GONG_API_BASE_URL, API_TIMEOUT } from "../constants.js";

let client: AxiosInstance | null = null;

function getClient(): AxiosInstance {
  if (client) return client;

  const accessKey = process.env.GONG_ACCESS_KEY;
  const accessSecret = process.env.GONG_ACCESS_KEY_SECRET;

  if (!accessKey || !accessSecret) {
    throw new Error(
      "Gong credentials not configured. Set GONG_ACCESS_KEY and GONG_ACCESS_KEY_SECRET environment variables."
    );
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

export async function gongGet<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
  const response = await getClient().get<T>(endpoint, { params });
  return response.data;
}

export async function gongPost<T>(endpoint: string, data?: Record<string, unknown>): Promise<T> {
  const response = await getClient().post<T>(endpoint, data);
  return response.data;
}

export function isGongConfigured(): boolean {
  return Boolean(process.env.GONG_ACCESS_KEY && process.env.GONG_ACCESS_KEY_SECRET);
}
