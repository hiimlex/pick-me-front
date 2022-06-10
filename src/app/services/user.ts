import { AxiosResponse } from "axios";
import { api } from "./api";

async function createUser(user: any): Promise<AxiosResponse<any>> {
  try {
    const response = await api.post("/api/users", user);

    return response;
  } catch (err: any) {
    throw new Error(err);
  }
}

export { createUser };
