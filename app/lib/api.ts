// api.js

const API_BASE_URL = "http://52.52.111.138:8080/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const fetchWrapper = async (
  endpoint: string,
  method = "GET",
  body = null,
  customHeaders = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = { ...defaultHeaders, ...customHeaders };

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const get = (endpoint: string, headers: any = {}) =>
  fetchWrapper(endpoint, "GET", null, headers);

export const post = (endpoint: string, body: any, headers: any = {}) =>
  fetchWrapper(endpoint, "POST", body, headers);

export const put = (endpoint: string, body: any, headers: any = {}) =>
  fetchWrapper(endpoint, "PUT", body, headers);

export const del = (endpoint: string, headers: any = {}) =>
  fetchWrapper(endpoint, "DELETE", null, headers);
