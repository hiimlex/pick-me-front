import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slicers/theme.slicer";

const rootReducer = combineReducers({
  theme: themeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
