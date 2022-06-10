import styled from "styled-components";
import {
  backgroundColorTheme,
  mainColorTheme,
  secondaryColorTheme,
} from "../../styles/theme";

export const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginContent = styled.div`
  padding: 24px;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;

  border-radius: 12px;
  border: 1px solid ${mainColorTheme}33;
`;

export const LoginButton = styled.button`
  border: none;
  outline: none;
  padding: 12px;
  width: 100%;
  border-radius: 12px;
  color: ${secondaryColorTheme};
  background: ${mainColorTheme};
  cursor: pointer;
  font-weight: 600;
  font-size: 22px;
`;
