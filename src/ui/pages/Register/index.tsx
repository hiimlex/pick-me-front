import { AxiosError } from "axios";
import { useRef, useState } from "react";
import { Loader, User } from "react-feather";
import { useForm, UseFormReturn } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IUser, NewUser } from "../../../app/models";
import {
  authenticateUser,
  createUser,
  removeAuthorizationHeaderToken,
  setAuthorizationHeaderToken,
  uploadUserAvatar,
} from "../../../app/services";
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
  RegisterForm,
  RegisterFormActions,
  RegisterFormSection,
  RegisterInput,
  RegisterSubtitle,
  RegisterTextArea,
  RegisterTitle,
  SendButton,
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
  const [uploading, setUploading] = useState(false);

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
    if (newValue > 0 && newValue <= 3) {
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

    await handleCreateUser({ ...data, ...partialUser });
  };

  const handleCreateUser = async (data: any) => {
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
          setRegistering(false);
          setUser(data);
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

  const handleUploadUserAvatar = async (e: any) => {
    e.preventDefault();

    if (file && user && !uploading) {
      setUploading(true);

      try {
        const {
          data: { accessToken },
        } = await authenticateUser({
          password: partialUser.password,
          username: partialUser.username,
        });

        if (accessToken) {
          setAuthorizationHeaderToken(accessToken);

          const { data: avatar } = await uploadUserAvatar(user.id, file);

          if (avatar) {
            dispatch(
              createNotification({
                message: "uou, now you have a profile picture!",
                type: "success",
              })
            );

            setUploading(false);

            setTimeout(() => {
              removeAuthorizationHeaderToken();
            });
          }
        }
      } catch (err: any) {
        setUploading(false);

        if (err instanceof AxiosError) {
          const { response } = err;

          if (response) {
            dispatch(
              createNotification({
                message: response.data.error,
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

        <RegisterSubtitle>
          {step === 3
            ? "your account was created, please choose your avatar"
            : "sign up your account"}
        </RegisterSubtitle>
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
              isLoading={registering}
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
                isLoading={registering}
              >
                {registering ? <Loader className="loader" /> : "register"}
              </RegisterButton>
            </RegisterFormActions>
          </RegisterForm>
        )}

        {step === 3 && (
          <RegisteredContent>
            <RegisteredInfo>
              <input
                ref={inputFileRef}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => handleOnChangeFile(e)}
              />
              <UploadFileButton onClick={() => handleUploadFile()} file={file}>
                <User></User>
              </UploadFileButton>
              <SendButton
                disabled={!file || uploading}
                onClick={(e) => handleUploadUserAvatar(e)}
              >
                {uploading ? "sending ..." : "send"}
              </SendButton>
            </RegisteredInfo>
          </RegisteredContent>
        )}

        <LinkAlternative onClick={() => handleNavigateToLogin()}>
          {step === 3 ? "or skip to login" : "login"}
        </LinkAlternative>
      </RegisterContent>
    </RegisterContainer>
  );
};

export default RegisterPage;
