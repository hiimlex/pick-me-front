import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
