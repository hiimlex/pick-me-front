import {
  ActionCreatorWithPayload,
  createAsyncThunk,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { IGetProductsFilters, IProduct } from "../../models";
import { getProducts } from "app/services";
import { RootState } from "..";

interface ProductsReducerState {
  products: IProduct[];
  filters: IGetProductsFilters;
}

export const fetchProducts = createAsyncThunk<
  IProduct[],
  undefined,
  { state: RootState }
>("products/getAll", async (_, { getState }) => {
  const { filters } = getState().products;

  const { data } = await getProducts(filters);

  return data;
});

export const productsSlicer = createSlice<
  ProductsReducerState,
  SliceCaseReducers<ProductsReducerState>
>({
  name: "products",
  initialState: {
    products: [],
    filters: {
      category: "",
    },
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const setProducts: ActionCreatorWithPayload<IProduct[], string> =
  productsSlicer.actions.setProducts as any;

export const setFilters: ActionCreatorWithPayload<IGetProductsFilters, string> =
  productsSlicer.actions.setFilters as any;

const productsReducer = productsSlicer.reducer;

export { productsReducer };
