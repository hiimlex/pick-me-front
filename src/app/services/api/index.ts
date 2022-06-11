import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: "https://pickmeapi.herokuapp.com",
});

export function errToAxiosError(err: any): AxiosError {
  const { message, code, config, request, response } = err;

  return new AxiosError(message, code, config, request, response);
}
