import {
  ActionCreatorWithPayload,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import { GenericAction } from "..";
import { ICategory } from "../../models";

interface CategoriesReducerState {
  categories: ICategory[];
}

const categoriesSlicer = createSlice<
  CategoriesReducerState,
  SliceCaseReducers<CategoriesReducerState>,
  string
>({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, action: GenericAction<ICategory[]>) => {
      state.categories = action.payload;
    },
  },
});

export const setCategories: ActionCreatorWithPayload<ICategory[], string> =
  categoriesSlicer.actions.setCategories as any;

const categoriesReducer = categoriesSlicer.reducer;

export default categoriesReducer;
