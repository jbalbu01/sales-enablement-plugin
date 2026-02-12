/**
 * ZoomInfo API Client
 *
 * Handles JWT authentication and HTTP requests to the ZoomInfo API.
 * Uses client ID + private key to generate JWT tokens.
 */

import axios, { AxiosInstance } from "axios";
import { ZOOMINFO_API_BASE_URL, API_TIMEOUT } from "../constants.js";

let client: AxiosInstance | null = null;
let jwtToken: string | null = null;
let tokenExpiry: number = 0;

async function authenticate(): Promise<string> {
  const clientId = process.env.ZOOMINFO_CLIENT_ID;
  const privateKey = process.env.ZOOMINFO_PRIVATE_KEY;

  if (!clientId || !privateKey) {
    throw new Error(
      "ZoomInfo credentials not configured. Set ZOOMINFO_CLIENT_ID and ZOOMINFO_PRIVATE_KEY environment variables."
    );
  }

  const response = await axios.post<{ jwt: string }>(
    `${ZOOMINFO_API_BASE_URL}/authenticate`,
    { clientId, privateKey },
    { timeout: API_TIMEOUT, headers: { "Content-Type": "application/json" } }
  );

  jwtToken = response.data.jwt;
  // JWT tokens are valid for 60 minutes; refresh at 55 minutes
  tokenExpiry = Date.now() + 55 * 60 * 1000;
  return jwtToken;
}

async function getToken(): Promise<string> {
  if (jwtToken && Date.now() < tokenExpiry) {
    return jwtToken;
  }
  return authenticate();
}

function getClient(): AxiosInstance {
  if (client) return client;

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

export async function zoomInfoPost<T>(
  endpoint: string,
  data?: Record<string, unknown>
): Promise<T> {
  const response = await getClient().post<T>(endpoint, data);
  return response.data;
}

export async function zoomInfoGet<T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> {
  const response = await getClient().get<T>(endpoint, { params });
  return response.data;
}

export function isZoomInfoConfigured(): boolean {
  return Boolean(process.env.ZOOMINFO_CLIENT_ID && process.env.ZOOMINFO_PRIVATE_KEY);
}
