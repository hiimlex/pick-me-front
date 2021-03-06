import { combineReducers, configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slicers/categories.slicer";
import notifierReducer from "./slicers/notifier.slicer";
import themeReducer from "./slicers/theme.slicer";
import userReducer from "./slicers/user.slicer";

export interface GenericAction<T = any> {
  type: string;
  payload: T;
}

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  notifier: notifierReducer,
  categories: categoriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
