// API Client Configuration
// Resolution order:
//   1. Runtime override saved in localStorage("api_base_url") — lets users point
//      a deployed preview at a tunnelled / hosted backend without rebuilding.
//   2. Build-time VITE_API_BASE_URL.
//   3. Fallback to http://localhost:5000/api for local dev.
const DEFAULT_BASE_URL =
  (typeof window !== "undefined" && localStorage.getItem("api_base_url")) ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

export const getBaseUrl = () =>
  (typeof window !== "undefined" && localStorage.getItem("api_base_url")) ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

export const setBaseUrl = (url: string) => {
  if (url) localStorage.setItem("api_base_url", url.replace(/\/$/, ""));
  else localStorage.removeItem("api_base_url");
};

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const token = localStorage.getItem("auth_token");
  const baseUrl = getBaseUrl();

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${endpoint}`, config);
  } catch (err) {
    // Network failure (server unreachable, CORS error, etc.)
    throw new Error(
      `Cannot reach the API server at ${baseUrl}. ` +
        `Make sure your backend is running, then set the API URL from the in-app settings.`
    );
  }

  if (response.status === 401) {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }

  // 204 No Content / empty body
  if (response.status === 204) return undefined as T;

  const contentType = response.headers.get("content-type") || "";
  const parse = async () =>
    contentType.includes("application/json") ? response.json() : response.text();

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const data = await parse();
      if (typeof data === "object" && data && "message" in data) message = (data as { message: string }).message;
      else if (typeof data === "string" && data) message = data;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  return (await parse()) as T;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: "POST", body }),
  put: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: "PUT", body }),
  patch: <T>(endpoint: string, body: unknown) => request<T>(endpoint, { method: "PATCH", body }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};

// File upload helper
export async function uploadFile(
  endpoint: string,
  file: File,
  additionalData?: Record<string, string>
): Promise<unknown> {
  const token = localStorage.getItem("auth_token");
  const baseUrl = getBaseUrl();
  const formData = new FormData();
  formData.append("file", file);

  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => formData.append(key, value));
  }

  let response: Response;
  try {
    response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });
  } catch {
    throw new Error(`Cannot reach the API server at ${baseUrl}.`);
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Upload failed" }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

export default api;
// Suppress unused warning while keeping default export name stable
void DEFAULT_BASE_URL;
