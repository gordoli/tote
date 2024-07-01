// api.js
import Storage from "./storage";
import { APP_CONST } from "./const";
import { reloadAsync } from "expo-updates";

const API_BASE_URL = "http://52.52.111.138:8080/api";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const fetchWrapper = async (
  endpoint: string,
  method = "GET",
  body = null,
  customHeaders = {}
) => {
  let userItem = await Storage.getItem(APP_CONST.AUTH);
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: any = { ...defaultHeaders, ...customHeaders };
  const isFormData = JSON.stringify(customHeaders).includes(
    `"Content-Type":"multipart/form-data"`
  );

  if (userItem !== null && userItem) {
    headers.Authorization = `Bearer ${userItem.accessToken.token}`;
  }

  const options = {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : null,
  };

  try {
    let response = await fetch(url, options);

    if (
      !response.ok &&
      response.status === 401 &&
      userItem !== null &&
      userItem
    ) {
      await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers,
        body: JSON.stringify({ refreshToken: userItem.refreshToken.token }),
      })
        .then(async (res) => {
          const result = await res.json();
          await Storage.updateItem(APP_CONST.AUTH, result.data);
          options.headers.Authorization = `Bearer ${result.data.accessToken.token}`;
          response = await fetch(url, options);
        })
        .catch((err) => {
          Storage.removeItem("AUTH");
          reloadAsync();
          throw err;
        });
    } else if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const get = (endpoint: string, headers: any = {}) =>
  fetchWrapper(endpoint, "GET", null, headers);

export const post = (endpoint: string, body: any, headers: any = {}) =>
  fetchWrapper(endpoint, "POST", body, headers);

export const patch = (endpoint: string, body: any, headers: any = {}) =>
  fetchWrapper(endpoint, "PATCH", body, headers);

export const put = (endpoint: string, body: any, headers: any = {}) =>
  fetchWrapper(endpoint, "PUT", body, headers);

export const del = (endpoint: string, headers: any = {}) =>
  fetchWrapper(endpoint, "DELETE", null, headers);
