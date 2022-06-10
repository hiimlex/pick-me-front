import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  AlternativeText,
  LinkAlternative,
  LoginButton,
  LoginContainer,
  LoginContent,
  LoginInput,
  LoginSubtitle,
  LoginTitle,
} from "./styles";

const Login = () => {
  const [toRegister, setToRegister] = useState(false);

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

        <LoginInput type="text" placeholder="username" />
        <LoginInput type="password" placeholder="password" />
        <LoginButton>login</LoginButton>
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
