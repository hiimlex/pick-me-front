import { AxiosResponse } from "axios";
import { IUser, NewUser } from "../../models";
import { api, errToAxiosError } from "../api";

async function createUser(user: NewUser): Promise<AxiosResponse<IUser>> {
  try {
    const response = await api.post("/users", user);

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

async function uploadUserAvatar(
  id: string,
  file: File
): Promise<AxiosResponse<{ file: any }>> {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post("/files/upload/user/" + id, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
  } catch (err) {
    throw errToAxiosError(err);
  }
}

async function getCurrentUser(): Promise<AxiosResponse<IUser>> {
  try {
    const response = await api.get("/auth/currentUser");

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

export { createUser, getCurrentUser, uploadUserAvatar };
