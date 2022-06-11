import { AxiosResponse } from "axios";
import { LoginModel, LoginResponse } from "../../models/auth";
import { api, errToAxiosError } from "../api";

async function authenticateUser(
  payload: LoginModel
): Promise<AxiosResponse<LoginResponse>> {
  try {
    const response = await api.post("/api/auth/signin", payload);

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

function setAuthorizationToken(token: string): void {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { authenticateUser, setAuthorizationToken };
