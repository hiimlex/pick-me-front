import { AxiosResponse } from "axios";
import { ICategory, NewProduct } from "../../models";
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

async function createProduct(
  body: NewProduct
): Promise<AxiosResponse<{ file: any }>> {
  try {
    const formData = new FormData();

    const { image, ...product } = body;

    formData.append("file", image[0]);
    formData.append("data", JSON.stringify(product));

    const response = await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response;
  } catch (err) {
    throw errToAxiosError(err);
  }
}

export { getProducts, getCategories, createProduct };
