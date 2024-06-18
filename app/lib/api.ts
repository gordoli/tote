// api.js
import Storage from "./storage";
import { APP_CONST } from "./const";

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
  let userItem = await Storage.getItem(APP_CONST.AUTH);
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: any = { ...defaultHeaders, ...customHeaders };

  if (userItem !== null && userItem) {
    headers.Authorization = `Bearer ${userItem.accessToken.token}`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    console.log(options);

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
