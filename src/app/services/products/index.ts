import { AxiosResponse } from "axios";
import { ICategory } from "../../models";
import { api, errToAxiosError } from "../api";

async function getProducts() {
  try {
    const response = await api.get("/products");

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

async function getCategories(): Promise<AxiosResponse<ICategory[]>> {
  try {
    const response = await api.get("/categories");

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

export { getProducts, getCategories };
