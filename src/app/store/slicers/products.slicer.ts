import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { IProduct } from "../../models";

interface ProductsReducerState {
  products: IProduct[];
}

export const productsSlicer = createSlice<
  ProductsReducerState,
  SliceCaseReducers<ProductsReducerState>
>({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    loadProducts: (state) => {},
  },
});
