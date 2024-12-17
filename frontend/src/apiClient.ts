export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestConfig<T = unknown> {
  body?: T;
  headers?: HeadersInit;
  queryParams?: Record<string, string | number>;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const buildQueryString = (params?: Record<string, string | number>) => {
  if (!params) return '';
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => query.append(key, String(value)));
  return `?${query.toString()}`;
};

const request = async <TResponse, TBody = unknown>(
  endpoint: string,
  method: RequestMethod,
  { body, headers = {}, queryParams }: RequestConfig<TBody> = {}
): Promise<TResponse> => {
  const url = `${BASE_URL}${endpoint}${buildQueryString(queryParams)}`;

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const errorData = isJson ? await response.json() : null;
    throw new Error(errorData?.message || 'Request failed');
  }

  if (response.status === 204) {
    return null as TResponse;
  }
  return response.json();
};

export const apiClient = {
  get: <TResponse>(endpoint: string, config?: RequestConfig) =>
    request<TResponse>(endpoint, 'GET', config),

  post: <TResponse, TBody = unknown>(endpoint: string, body: TBody, config?: RequestConfig<TBody>) =>
    request<TResponse, TBody>(endpoint, 'POST', { ...config, body }),

  put: <TResponse, TBody = unknown>(endpoint: string, body: TBody, config?: RequestConfig<TBody>) =>
    request<TResponse, TBody>(endpoint, 'PUT', { ...config, body }),

  delete: <TResponse>(endpoint: string, config?: RequestConfig) =>
    request<TResponse>(endpoint, 'DELETE', config),
};