import { AxiosError } from "axios";
import { useState } from "react";
import { Loader } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginModel } from "../../../app/models";
import { getCurrentUser } from "../../../app/services";
import {
  authenticateUser,
  setAuthorizationToken,
} from "../../../app/services/auth";
import { setAuthToken } from "../../../app/services/token";
import { setUserState } from "../../../app/store/slicers";
import { createNotification } from "../../../app/store/slicers/notifier.slicer";
import {
  AlternativeText,
  LinkAlternative,
  LoginButton,
  LoginContainer,
  LoginContent,
  LoginForm,
  LoginInput,
  LoginSubtitle,
  LoginTitle,
} from "./styles";

const Login = () => {
  const dispatch = useDispatch();
  const [loggingIn, setLoggingIn] = useState(false);
  const [toRegister, setToRegister] = useState(false);
  const {
    handleSubmit,
    register: registerField,
    formState,
  } = useForm({ mode: "all" });

  const usernameField = registerField("username", { required: true });
  const passwordField = registerField("password", { required: true });

  const onSubmitLoginForm = async (data: any) => {
    const { username, password } = data;

    setLoggingIn(true);

    if (username && password) {
      const login: LoginModel = {
        username,
        password,
      };

      try {
        const { data } = await authenticateUser(login);

        if (data) {
          setAuthorizationToken(data.accessToken);
          setAuthToken(data.accessToken);
          setLoggingIn(false);
          await handleCurrentUser();
        }
      } catch (error) {
        setLoggingIn(false);

        if (error instanceof AxiosError) {
          const { response } = error;

          if (response) {
            dispatch(
              createNotification({
                type: "error",
                message: response.data.error,
                duration: 2000,
                position: "bottom",
              })
            );
          }
        }
      }
    }
  };

  const handleCurrentUser = async () => {
    try {
      const { data } = await getCurrentUser();

      if (data) {
        dispatch(setUserState(data));
        setLoggingIn(false);
      }
    } catch (error) {
      setLoggingIn(false);

      if (error instanceof AxiosError) {
        const { response } = error;

        if (response) {
          dispatch(
            createNotification({
              type: "error",
              message: response.data.error,
              duration: 2000,
              position: "bottom",
            })
          );
        }
      }
    }
  };

  const handleNavigateToRegister = () => {
    setToRegister(true);
  };

  return (
    <LoginContainer>
      <LoginContent>
        <LoginTitle>
          <b>pick</b>.me
        </LoginTitle>
        <LoginSubtitle>login with your account</LoginSubtitle>

        <LoginForm onSubmit={handleSubmit(onSubmitLoginForm)}>
          <LoginInput type="text" placeholder="username" {...usernameField} />
          <LoginInput
            type="password"
            placeholder="password"
            {...passwordField}
          />
          <LoginButton
            type="submit"
            disabled={!formState.isValid}
            isDisabled={!formState.isValid}
            isLoading={loggingIn}
          >
            {loggingIn ? <Loader className="loader" /> : "login"}
          </LoginButton>
        </LoginForm>
        <AlternativeText>or</AlternativeText>

        <LinkAlternative onClick={handleNavigateToRegister}>
          sign up
        </LinkAlternative>
      </LoginContent>

      {toRegister && <Navigate to="/register" />}
    </LoginContainer>
  );
};

export default Login;
