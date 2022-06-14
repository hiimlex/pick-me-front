import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { Loader } from "react-feather";
import { useForm, UseFormReturn } from "react-hook-form";
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

  const [step, setStep] = useState(1);
  const [partialUser, setPartialUser] = useState<{ [key: string]: any }>({});
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const stepOneForm: UseFormReturn = useForm({ mode: "all" });
  const stepTwoForm: UseFormReturn = useForm({ mode: "all" });

  const password = useRef({});
  password.current = stepTwoForm.watch("password", "");

  const validSetStep = (current: number, newValue: number): number => {
    if (newValue > 0 && newValue <= 3) {
      return newValue;
    } else {
      return current;
    }
  };

  const handleStepOneForm = async (data: any) => {
    setStep((currentValue) => validSetStep(currentValue, currentValue + 1));
    setPartialUser((currentValue) => ({ ...currentValue, ...data }));
  };

  const handleStepTwoForm = async (data: any) => {
    setPartialUser((currentValue) => {
      const newValue = { ...currentValue, ...data };

      return newValue;
    });

    await handleCreateUser({ ...data, ...partialUser });
  };

  const handleCreateUser = async (data: any) => {
    console.log(partialUser);
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
          setStep((currentValue) =>
            validSetStep(currentValue, currentValue + 1)
          );
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
    } else {
      setRegistering(false);
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
            {step === 1 && (
              <RegisterForm
                onSubmit={stepOneForm.handleSubmit(handleStepOneForm)}
              >
                <RegisterFormSection>profile info</RegisterFormSection>
                <RegisterInput
                  type="text"
                  placeholder="name"
                  {...stepOneForm.register("name", { required: true })}
                />
                <RegisterInput
                  type="email"
                  placeholder="email"
                  {...stepOneForm.register("email", { required: true })}
                />
                <RegisterTextArea
                  placeholder="bio"
                  {...stepOneForm.register("bio", { required: true })}
                />

                <RegisterButton
                  type="submit"
                  disabled={!stepOneForm.formState.isValid}
                  isDisabled={!stepOneForm.formState.isValid}
                  isLoading={registering}
                >
                  continue
                </RegisterButton>
              </RegisterForm>
            )}
            {step === 2 && (
              <RegisterForm
                onSubmit={stepTwoForm.handleSubmit(handleStepTwoForm)}
              >
                <RegisterFormSection>account info</RegisterFormSection>
                <RegisterInput
                  type="text"
                  placeholder="username"
                  {...stepTwoForm.register("username", { required: true })}
                />
                <RegisterInput
                  type="password"
                  placeholder="password"
                  {...stepTwoForm.register("password", { required: true })}
                />
                <RegisterInput
                  type="password"
                  placeholder="confirm password"
                  {...stepTwoForm.register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      password.current === value || "passwords do not match",
                  })}
                />
                <RegisterButton
                  type="submit"
                  disabled={!stepTwoForm.formState.isValid}
                  isDisabled={!stepTwoForm.formState.isValid}
                  isLoading={registering}
                >
                  {registering ? <Loader className="loader" /> : "register"}
                </RegisterButton>
              </RegisterForm>
            )}

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
