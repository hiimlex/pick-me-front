import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { Loader, User } from "react-feather";
import { useForm, UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IUser, NewUser } from "../../../app/models";
import { createUser } from "../../../app/services";
import { createNotification } from "../../../app/store/slicers/notifier.slicer";
import Logo from "../../components/Logo";
import {
  BackButton,
  LinkAlternative,
  RegisterButton,
  RegisterContainer,
  RegisterContent,
  RegisteredContent,
  RegisteredInfo,
  RegisteredInfoText,
  RegisterForm,
  RegisterFormActions,
  RegisterFormSection,
  RegisterInput,
  RegisterSubtitle,
  RegisterTextArea,
  RegisterTitle,
  UploadFileButton,
} from "./styles";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File>();
  const [user, setUser] = useState<IUser>();
  const [partialUser, setPartialUser] = useState<{ [key: string]: any }>({});
  const [registering, setRegistering] = useState(false);

  const stepOneForm: UseFormReturn = useForm({ mode: "all" });
  const stepTwoForm: UseFormReturn = useForm({ mode: "all" });

  const passwordFieldRef = useRef({});
  passwordFieldRef.current = stepTwoForm.watch("password", "");

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const validSetStep = (current: number, newValue: number): number => {
    if (newValue > 0 && newValue <= 4) {
      return newValue;
    } else {
      return current;
    }
  };

  const backOneStep = () => {
    setStep((currentValue) => validSetStep(currentValue, currentValue - 1));
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

    setStep((currentValue) => validSetStep(currentValue, currentValue + 1));
  };

  const canCreateUser = (): boolean => {
    const { email, password, confirmPassword, username, name, bio } =
      partialUser;

    return (
      !!file &&
      !!email &&
      !!password &&
      !!confirmPassword &&
      confirmPassword === password &&
      !!username &&
      !!name &&
      !!bio
    );
  };

  const handleCreateUser = async () => {
    const { username, password, confirmPassword, email, name, bio } =
      partialUser;

    if (
      username &&
      password &&
      confirmPassword &&
      email &&
      name &&
      bio &&
      password === confirmPassword &&
      file
    ) {
      setRegistering(true);

      const newUser: NewUser = {
        username,
        password,
        email,
        name,
        bio,
        avatar: file,
      };

      try {
        const { data } = await createUser(newUser);

        if (data) {
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
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  return (
    <RegisterContainer>
      <RegisterContent>
        <RegisterTitle>
          <Logo clickable={true} callback={() => handleNavigateToHome()} />
        </RegisterTitle>

        {step !== 4 && (
          <RegisterSubtitle>
            {step === 3 ? "please choose your avatar" : "sign up your account"}
          </RegisterSubtitle>
        )}
        {step === 1 && (
          <RegisterForm onSubmit={stepOneForm.handleSubmit(handleStepOneForm)}>
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
              isLoading={false}
            >
              continue
            </RegisterButton>
          </RegisterForm>
        )}
        {step === 2 && (
          <RegisterForm onSubmit={stepTwoForm.handleSubmit(handleStepTwoForm)}>
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
                  passwordFieldRef.current === value ||
                  "passwords do not match",
              })}
            />
            <RegisterFormActions>
              <BackButton
                style={{ flex: "0.45" }}
                onClick={() => backOneStep()}
              >
                back
              </BackButton>
              <RegisterButton
                style={{ flex: "0.45" }}
                type="submit"
                disabled={!stepTwoForm.formState.isValid}
                isDisabled={!stepTwoForm.formState.isValid}
                isLoading={false}
              >
                continue
              </RegisterButton>
            </RegisterFormActions>
          </RegisterForm>
        )}

        {step === 3 && (
          <RegisterForm>
            <RegisteredInfo>
              <input
                ref={inputFileRef}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={(e) => handleOnChangeFile(e)}
              />
              <UploadFileButton onClick={() => handleUploadFile()} file={file}>
                {!file && <User />}
              </UploadFileButton>
            </RegisteredInfo>
            <RegisterFormActions>
              <BackButton
                style={{ flex: "0.45" }}
                onClick={() => backOneStep()}
              >
                back
              </BackButton>
              <RegisterButton
                style={{ flex: "0.45" }}
                type="button"
                disabled={!canCreateUser()}
                isDisabled={!canCreateUser()}
                isLoading={false}
                onClick={() => handleCreateUser()}
              >
                {registering ? <Loader /> : "register"}
              </RegisterButton>
            </RegisterFormActions>
          </RegisterForm>
        )}

        {step === 4 && (
          <RegisteredContent>
            <RegisteredInfo>
              <RegisteredInfoText>
                account created, please go to{" "}
                <LinkAlternative onClick={() => handleNavigateToLogin()}>
                  login
                </LinkAlternative>
              </RegisteredInfoText>
            </RegisteredInfo>
          </RegisteredContent>
        )}

        {step !== 4 && (
          <LinkAlternative onClick={() => handleNavigateToLogin()}>
            login
          </LinkAlternative>
        )}
      </RegisterContent>
    </RegisterContainer>
  );
};

export default RegisterPage;
