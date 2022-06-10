import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import AppRouter from "./app/router";
import { RootState } from "./app/store";
import { changeTheme, localStorageThemeKey } from "./app/store/slicers";
import GlobalStyle from "./ui/styles/global";

function App() {
  const themeState = useSelector((state: RootState) => state.theme.value);
  const dispatch = useDispatch();

  useEffect(() => {
    let localStorageTheme = localStorage.getItem(localStorageThemeKey);

    if (localStorageTheme && localStorageTheme !== themeState) {
      dispatch(changeTheme(localStorageTheme));
    }

    if (!localStorageTheme) {
      localStorage.setItem(localStorageThemeKey, themeState);
    }
  }, [dispatch, themeState]);

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
