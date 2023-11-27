import { ApiUrls } from 'shared/enums/ApiUrls';
import { BASE_URL } from 'shared/env/env-variables';

/**
 * Wrapper function for making fetch requests.
 * @param {string} url - The URL to send the request including method (ex. '[GET]/urlPath')
 * @param {object} pathParams - Path parameters
 * @param {object} queryParams - Query parameters
 * @param {any} body - body for request
 * @param {object} cancelToken - AbortSignal
 * @returns {Promise} - Fetch request promise
 */

enum HttpMethod {
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
}

function parseUrl(url: string): { method: string; path: string } {
  // Regular expression to extract method and path
  const regex = /^\[(\w+)]([^\s]+)/;
  const matches = url.match(regex);

  if (matches) {
    const method = matches[1];
    const path = matches[2];

    if (!(method in HttpMethod)) {
      throw new Error(`Invalid method: ${method}`);
    }

    return { method, path };
  }
  throw new Error(`Invalid url structure: ${url}`);
}

function substitutePathParameters(
  pathWithPlaceholders: string,
  parameters?: Record<string, unknown>,
) {
  if (typeof parameters !== 'object' || Array.isArray(parameters) || parameters === null) {
    return pathWithPlaceholders;
  }

  let generatedPath = pathWithPlaceholders;
  Object.keys(parameters).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(parameters, key)) {
      const placeholder = `{${key}}`;
      const value = parameters[key];
      generatedPath = pathWithPlaceholders.replace(placeholder, `${value}`);
    }
  });
  return generatedPath;
}

function generateQueryString(queryParams: Record<string, unknown>) {
  return Object.entries(queryParams)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((item: string) => `${key}=${encodeURIComponent(item)}`).join('&');
      }
      return `${key}=${encodeURIComponent(value as string | number | boolean)}`;
    })
    .join('&');
}

type Props = {
  url: ApiUrls;
  pathParams?: Record<string, unknown>;
  queryParams?: Record<string, unknown>;
  body?: unknown; // queries | body,
  cancelToken?: AbortSignal;
};

export async function request<Response>({
  url,
  pathParams,
  queryParams,
  body,
  cancelToken,
}: Props): Promise<Response> {
  const { method, path } = parseUrl(url);
  let fullUrl = `${BASE_URL}${substitutePathParameters(path, pathParams)}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (cancelToken) {
    requestOptions.signal = cancelToken;
  }

  if (method !== 'GET' && body) {
    requestOptions.body = JSON.stringify(body);
  }

  if (queryParams) {
    fullUrl += `?${generateQueryString(queryParams)}`;
  }

  const response = await fetch(fullUrl, requestOptions);

  if (response?.ok) {
    const res = await response?.json();
    return res as Response;
  }
  throw new Error(response?.statusText || 'Unknown error');
}
