import styled, { css } from "styled-components";
import {
  backgroundColorTheme,
  inputBackgroundColor,
  mainColorTheme,
  secondaryTextColor,
} from "../../styles/theme";
import { loader } from "../Register/styles";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #2f0b51;
`;

export const LoginContent = styled.div`
  padding: 24px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  background: ${backgroundColorTheme};

  border-radius: 12px;
  border: 1px solid ${mainColorTheme}33;
`;

export const disabledButton = css`
  background: #afafaf;
  color: white;
  cursor: not-allowed;

  &:hover {
    background: #afafaf;
    color: white;
  }
`;

export const LoginTitle = styled.h1`
  font-weight: 400;
  font-size: 32px;
  margin-bottom: 12px;
  color: ${mainColorTheme};
`;

export const LoginSubtitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
`;

export const LoginInput = styled.input`
  min-width: 380px;
  height: 42px;
  margin-bottom: 24px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 18px;
  background: ${inputBackgroundColor};
  color: ${secondaryTextColor};

  &:focus {
    outline: 1px solid ${mainColorTheme}33;
  }
`;

export const LoginForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AlternativeText = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
  color: ${secondaryTextColor};
`;

export const LinkAlternative = styled.span`
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  color: ${mainColorTheme};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const LoginButton = styled.button<{
  isDisabled: boolean;
  isLoading: boolean;
}>`
  border: none;
  outline: none;
  padding: 12px;
  width: 100%;
  border-radius: 12px;
  color: #fff;
  background: ${mainColorTheme};
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 12px;

  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${mainColorTheme}dd;
    color: #fff;
  }

  ${({ isDisabled }) => isDisabled && disabledButton};
  ${({ isLoading }) => isLoading && loader};
`;
