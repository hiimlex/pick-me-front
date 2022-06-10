import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  AlternativeText,
  LinkAlternative,
  RegisterButton,
  RegisterContainer,
  RegisterContent,
  RegisterForm,
  RegisterFormSection,
  RegisterInput,
  RegisterSubtitle,
  RegisterTextArea,
  RegisterTitle,
} from "./styles";

const Register = () => {
  const [toLogin, setToLogin] = useState(false);

  const handleNavigateToLogin = () => {
    setToLogin(true);
  };

  return (
    <RegisterContainer>
      <RegisterContent>
        <RegisterTitle>
          <b>pick</b>.me
        </RegisterTitle>

        <RegisterSubtitle>sign up your account</RegisterSubtitle>

        <RegisterForm>
          <RegisterFormSection>profile info</RegisterFormSection>
          <RegisterInput type="text" placeholder="name" />
          <RegisterInput type="email" placeholder="email" />
          <RegisterTextArea placeholder="bio" />
          <RegisterFormSection>account info</RegisterFormSection>
          <RegisterInput type="text" placeholder="username" />
          <RegisterInput type="password" placeholder="password" />
          <RegisterInput type="password" placeholder="confirm password" />
        </RegisterForm>
        <RegisterButton>register</RegisterButton>
        <AlternativeText>or</AlternativeText>

        <LinkAlternative onClick={handleNavigateToLogin}>
          sign up
        </LinkAlternative>
      </RegisterContent>

      {toLogin && <Navigate to="/login" />}
    </RegisterContainer>
  );
};

export default Register;
