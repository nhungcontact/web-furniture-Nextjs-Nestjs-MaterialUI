import appConfig from "@/config/env";
import { ErrorResponse, FetchOptions } from "@/types/shared";
import { buildQueryString } from "@/utils/query";
import { getSession } from "next-auth/react";

export async function fetcher<Data, Params, Body>(
  options: FetchOptions<Params, Body>,
): Promise<Data> {
  let url = appConfig.API_HOST + options.path;
  let body;

  const session = await getSession();
  const headers: Record<string, string> = {};

  if (session?.user?.accessToken) {
    headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
  }

  if (options.params) {
    url += buildQueryString(options.params as Record<string, string | number>);
  }

  if (options?.body) {
    if (options.body instanceof FormData) {
      body = options.body;
    } else {
      body = JSON.stringify(options.body);
      headers["Content-Type"] = "application/json";
    }
  }

  return fetch(url, {
    method: options?.method || "GET",
    // credentials: "include", // include, same-origin, omit
    mode: "cors", // no-cors, cors, same-origin
    headers: {
      ...headers,
      ...options?.headers,
    },
    body,
  }).then(async (res) => {
    if (!res.ok) {
      if (res.body && res.headers.get("Content-Type")?.includes("application/json")) {
        const error: ErrorResponse<Data> = await res.json();
        throw error;
      } else {
        const error: ErrorResponse<Data> = {
          code: `${res.status}`,
          message: res.statusText,
        };
        throw error;
      }
    }

    return res.json();
  });
}
