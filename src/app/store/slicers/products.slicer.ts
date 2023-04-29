import {
  ActionCreatorWithPayload,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
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
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const setProducts: ActionCreatorWithPayload<IProduct[], string> =
  productsSlicer.actions.setProducts as any;

const productsReducer = productsSlicer.reducer;

export { productsReducer };
