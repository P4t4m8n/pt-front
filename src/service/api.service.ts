import { ClientError } from "../utils/ClientError";

const BASE_URL = "http://localhost:3030/api/v1/";
type TApiService = {
  get<T>(endpoint: string, data?: unknown): Promise<T>;
  post<T, R>(endpoint: string, data?: T): Promise<R>;
  put<T, R>(endpoint: string, data?: T): Promise<R>;
  delete<T>(endpoint: string, data?: unknown): Promise<T>;
  buildQuery(filter: Record<string, unknown>): string;
};
type TMethod = "GET" | "POST" | "PUT" | "DELETE";

const ajax = async <T>(
  endpoint: string,
  method: TMethod = "GET",
  data: unknown = null
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    credentials: "include",
    headers: {
      ...(data instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
    },
  };

  if (method !== "GET" && data) {
    if (data instanceof FormData) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
  } else if (method === "GET" && data) {
    const queryParams = new URLSearchParams(data as Record<string, string>);
    endpoint += `?${queryParams.toString()}`;
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const error = await res.json();
    console.log("error:", error);
    if (res.status >= 400 && res.status < 500) {
      throw ClientError.create<T>(res.status, error);
    }

    throw new Error(error.message);
  }

  return (await res.json()) as T;
};

const buildQuery = (filter: Record<string, string>) => {
  let query = "?";
  Object.entries(filter).forEach(([key, value]) => {
    if (!value) return;
    query += `${key}=${value}&`;
  });
  return query;
};

export const apiService: TApiService = {
  get(endpoint, data) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint, data) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint, data) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, "DELETE", data);
  },
  buildQuery,
};
