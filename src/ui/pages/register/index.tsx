import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { Loader } from "react-feather";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NewUser } from "../../../app/models";
import { createUser } from "../../../app/services";
import { createNotification } from "../../../app/store/slicers/notifier.slicer";
import Logo from "../../components/Logo";
import {
  AlternativeText,
  LinkAlternative,
  RegisterButton,
  RegisterContainer,
  RegisterContent,
  RegisteredContent,
  RegisteredInfo,
  RegisterForm,
  RegisterFormSection,
  RegisterInput,
  RegisterSubtitle,
  RegisterTextArea,
  RegisterTitle,
} from "./styles";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const { register, handleSubmit, formState, watch } = useForm({ mode: "all" });

  const password = useRef({});
  password.current = watch("password", "");

  const handleRegisterForm = async (data: any) => {
    const { username, password, confirmPassword, email, name, bio } = data;

    setRegistering(true);

    if (
      username &&
      password &&
      confirmPassword &&
      email &&
      name &&
      bio &&
      password === confirmPassword
    ) {
      const newUser: NewUser = {
        username,
        password,
        email,
        name,
        bio,
      };

      try {
        const { data } = await createUser(newUser);

        if (data) {
          setRegistered(true);
          setRegistering(false);
        }
      } catch (error) {
        setRegistering(false);

        if (error instanceof AxiosError) {
          const { response } = error;

          if (response) {
            dispatch(
              createNotification({
                type: "error",
                message: response.data.error,
                duration: 5000,
                position: "bottom",
              })
            );
          }
        }
      }
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  return (
    <RegisterContainer fullHeight={registered}>
      <RegisterContent>
        <RegisterTitle>
          <Logo clickable={true} callback={handleNavigateToHome} />
        </RegisterTitle>

        {!registered && (
          <>
            <RegisterSubtitle>sign up your account</RegisterSubtitle>
            <RegisterForm onSubmit={handleSubmit(handleRegisterForm)}>
              <RegisterFormSection>profile info</RegisterFormSection>
              <RegisterInput
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
              />
              <RegisterInput
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
              />
              <RegisterTextArea
                placeholder="bio"
                {...register("bio", { required: true })}
              />
              <RegisterFormSection>account info</RegisterFormSection>
              <RegisterInput
                type="text"
                placeholder="username"
                {...register("username", { required: true })}
              />
              <RegisterInput
                type="password"
                placeholder="password"
                {...register("password", { required: true })}
              />
              <RegisterInput
                type="password"
                placeholder="confirm password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    password.current === value || "passwords do not match",
                })}
              />
              <RegisterButton
                type="submit"
                disabled={!formState.isValid}
                isDisabled={!formState.isValid}
                isLoading={registering}
              >
                {registering ? <Loader className="loader" /> : "register"}
              </RegisterButton>
            </RegisterForm>

            <AlternativeText>or</AlternativeText>

            <LinkAlternative onClick={handleNavigateToLogin}>
              sign up
            </LinkAlternative>
          </>
        )}

        {registered && (
          <RegisteredContent>
            <RegisteredInfo>
              now you have a pick.me account
              <br /> please go to{" "}
              <LinkAlternative onClick={handleNavigateToLogin}>
                Login
              </LinkAlternative>
            </RegisteredInfo>
          </RegisteredContent>
        )}
      </RegisterContent>
    </RegisterContainer>
  );
};

export default Register;
