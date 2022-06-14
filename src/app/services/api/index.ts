import axios, { AxiosError } from "axios";
import store from "../../store";
import { removeUserState } from "../../store/slicers";
import { removeAuthorizationHeaderToken } from "../auth";
import { removeAuthToken } from "../token";

export function errToAxiosError(err: any): AxiosError {
  const { message, code, config, request, response } = err;

  return new AxiosError(message, code, config, request, response);
}

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

api.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error: any) => {
    if (error.response.status === 401 || error.response.status === 403) {
      removeAuthToken();
      removeAuthorizationHeaderToken();
      store.dispatch(removeUserState());
    }

    return Promise.reject(error);
  }
);
