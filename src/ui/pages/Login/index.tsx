import { AxiosError } from "axios";
import { useState } from "react";
import { Loader } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginModel } from "../../../app/models";
import { getCurrentUser } from "../../../app/services";
import {
  authenticateUser,
  setAuthorizationHeaderToken,
} from "../../../app/services/auth";
import { setAuthToken } from "../../../app/services/token";
import { setUserState } from "../../../app/store/slicers";
import { createNotification } from "../../../app/store/slicers/notifier.slicer";
import Logo from "../../components/Logo";
import {
  LinkAlternative,
  LoginButton,
  LoginContainer,
  LoginContent,
  LoginForm,
  LoginInput,
  LoginSubtitle,
  LoginTitle,
} from "./styles";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggingIn, setLoggingIn] = useState(false);
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
          setAuthorizationHeaderToken(data.accessToken);
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
        navigate("/home");
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

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  return (
    <LoginContainer>
      <LoginContent>
        <LoginTitle>
          <Logo clickable={true} callback={handleNavigateToHome} />
        </LoginTitle>
        <LoginSubtitle style={{ marginBottom: loggingIn ? "12px" : "24px" }}>
          login with your account
        </LoginSubtitle>

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

        <LinkAlternative
          onClick={() => {
            navigate("/register");
          }}
        >
          sign up
        </LinkAlternative>
      </LoginContent>
    </LoginContainer>
  );
};

export default LoginPage;
