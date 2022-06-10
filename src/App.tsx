import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "styled-theming";
import AppRouter from "./app/router";
import { RootState } from "./app/store";
import { changeTheme, localStorageThemeKey } from "./app/store/slicers";
import GlobalStyle from "./ui/styles/global";

function App() {
  const themeState = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();
  let localStorageTheme = localStorage.getItem(localStorageThemeKey);

  useEffect(() => {
    if (localStorageTheme && localStorageTheme !== themeState) {
      dispatch(changeTheme(localStorageTheme));
    } else {
      localStorage.setItem(localStorageThemeKey, themeState);
    }
  }, [localStorageTheme]);

  return (
    <ThemeProvider theme={{ theme: themeState }}>
      <GlobalStyle />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
