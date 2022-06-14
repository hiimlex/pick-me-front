import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AppRouter } from "./app/router";
import { RootState } from "./app/store";
import { changeTheme, localStorageThemeKey } from "./app/store/slicers";
import Notifier from "./ui/components/Notifier";
import { NotifierContainer } from "./ui/components/Notifier/styles";
import { GlobalStyle } from "./ui/styles/global";

function App() {
  const dispatch = useDispatch();
  const themeState = useSelector((state: RootState) => state.theme.value);
  const notifierReducer = useSelector(
    (state: RootState) => state.notifier.notifications
  );

  const handlePersistedTheme = useCallback(() => {
    let localStorageTheme = localStorage.getItem(localStorageThemeKey);

    if (localStorageTheme && localStorageTheme !== themeState) {
      dispatch(changeTheme(localStorageTheme));
    }

    if (!localStorageTheme) {
      localStorage.setItem(localStorageThemeKey, themeState);
    }
  }, [dispatch, themeState]);

  useEffect(() => {
    handlePersistedTheme();
  }, [handlePersistedTheme]);

  return (
    <ThemeProvider theme={{ theme: themeState }}>
      <GlobalStyle />

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>

      {notifierReducer.length > 0 && (
        <NotifierContainer>
          {notifierReducer.map((el) => (
            <Notifier
              key={el.id}
              id={el.id}
              duration={el.duration}
              message={el.message}
              position={el.position}
              type={el.type}
            ></Notifier>
          ))}
        </NotifierContainer>
      )}
    </ThemeProvider>
  );
}

export default App;
