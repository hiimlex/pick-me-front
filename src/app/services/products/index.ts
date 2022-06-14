import { api, errToAxiosError } from "../api";

async function getProducts() {
  try {
    const response = await api.get("/products");

    return response;
  } catch (err: any) {
    throw errToAxiosError(err);
  }
}

export { getProducts };
