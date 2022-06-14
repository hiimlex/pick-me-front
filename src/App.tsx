import { AxiosError } from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AppRouter } from "./app/router";
import {
  getAuthToken,
  getCurrentUser,
  removeAuthorizationHeaderToken,
  removeAuthToken,
  setAuthorizationHeaderToken,
} from "./app/services";
import { RootState } from "./app/store";
import {
  changeTheme,
  localStorageThemeKey,
  removeUserState,
  setUserState,
} from "./app/store/slicers";
import { createNotification } from "./app/store/slicers/notifier.slicer";
import Notifier from "./ui/components/Notifier";
import { NotifierContainer } from "./ui/components/Notifier/styles";
import GlobalStyle from "./ui/styles/global";

function App() {
  const dispatch = useDispatch();
  const themeState = useSelector((state: RootState) => state.theme.value);
  const notifierReducer = useSelector(
    (state: RootState) => state.notifier.notifications
  );

  const token = getAuthToken();

  const handleCurrentUserData = useCallback(async () => {
    if (token) {
      setAuthorizationHeaderToken(token);

      try {
        const { data } = await getCurrentUser();

        if (data) {
          dispatch(setUserState(data));
        }
      } catch (err: any) {
        if (err instanceof AxiosError) {
          const { response } = err;

          if (response) {
            dispatch(createNotification({ message: response.data.message }));
          }

          dispatch(removeUserState());
          removeAuthToken();
          removeAuthorizationHeaderToken();
        }
      }
    }
  }, [dispatch, token]);

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

  useEffect(() => {
    handleCurrentUserData();
  }, [handleCurrentUserData]);

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
