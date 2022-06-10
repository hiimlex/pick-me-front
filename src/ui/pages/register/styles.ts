import styled from "styled-components";

import {
  backgroundColorTheme,
  inputBackgroundColor,
  mainColorTheme,
  secondaryTextColor,
} from "../../styles/theme";

export const RegisterContainer = styled.div`
  width: 100%;
  max-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 120px 0;

  background: #2f0b51;
`;

export const RegisterContent = styled.div`
  padding: 24px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  background: ${backgroundColorTheme};

  border-radius: 12px;
  border: 1px solid ${mainColorTheme}33;
`;

export const RegisterButton = styled.button`
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
`;

export const RegisterTitle = styled.h1`
  font-weight: 400;
  font-size: 32px;
  margin-bottom: 12px;
  color: ${mainColorTheme};
`;

export const RegisterSubtitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
  color: ${secondaryTextColor};
  margin-bottom: 24px;
`;

export const RegisterInput = styled.input`
  min-width: 380px;
  height: 42px;
  margin-bottom: 24px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 18px;
  color: ${secondaryTextColor};
  background: ${inputBackgroundColor};

  &:focus {
    outline: 1px solid ${mainColorTheme}33;
  }
`;

export const RegisterTextArea = styled.textarea`
  min-width: 380px;
  height: 88px;
  margin-bottom: 24px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 18px;
  background: ${inputBackgroundColor};
  resize: none;
  color: ${secondaryTextColor};

  &:focus {
    outline: 1px solid ${mainColorTheme}33;
  }
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

export const RegisterForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const RegisterFormSection = styled.label`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
  color: ${secondaryTextColor};
`;
