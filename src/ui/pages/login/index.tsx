import React from "react";
import { LoginButton, LoginContainer, LoginContent } from "./styles";

const Login = () => {
  return (
    <LoginContainer>
      <LoginContent>
        <h1>pick.me</h1>
        <h3>login with your account</h3>

        <form>
          <input type="text" />
          <input type="text" />
        </form>
        <LoginButton>login</LoginButton>
        <span>or</span>
        <span>sign up</span>
      </LoginContent>
    </LoginContainer>
  );
};

export default Login;
