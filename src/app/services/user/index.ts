import { AxiosResponse } from "axios";
import { NewUser, User } from "../../models";
import { api, errToAxiosError } from "../api";

async function createUser(user: NewUser): Promise<AxiosResponse<User>> {
  try {
    const response = await api.post("/users", user);

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

async function getCurrentUser(): Promise<AxiosResponse<User>> {
  try {
    const response = await api.get("/auth/currentUser");

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

export { createUser, getCurrentUser };
