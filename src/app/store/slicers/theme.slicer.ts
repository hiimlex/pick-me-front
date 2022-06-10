import { createSlice } from "@reduxjs/toolkit";

export const localStorageThemeKey = "defaultTheme";
const persistedTheme = localStorage.getItem(localStorageThemeKey);

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: persistedTheme || "light",
  },
  reducers: {
    changeTheme: (state, action) => {
      state.value = action.payload;
      localStorage.setItem(localStorageThemeKey, action.payload);
    },
  },
});

export const { changeTheme } = themeSlice.actions;

const themeReducer = themeSlice.reducer;

export default themeReducer;
