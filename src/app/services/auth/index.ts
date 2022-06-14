import { AxiosResponse } from "axios";
import { LoginModel, LoginResponse } from "../../models/auth";
import { api, errToAxiosError } from "../api";

async function authenticateUser(
  payload: LoginModel
): Promise<AxiosResponse<LoginResponse>> {
  try {
    const response = await api.post("/auth/signin", payload);

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

function setAuthorizationHeaderToken(token: string): void {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

function removeAuthorizationHeaderToken(): void {
  delete api.defaults.headers.common["Authorization"];
}

export { authenticateUser, setAuthorizationHeaderToken, removeAuthorizationHeaderToken };
