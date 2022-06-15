import styled from "styled-components";
import {
  inputBackgroundColor,
  secondaryTextColor,
  mainColorTheme,
} from "../../styles/theme";

export const InputStyle = styled.input`
  width: 100%;
  height: 38px;
  margin-bottom: 24px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 18px;
  background: ${inputBackgroundColor};
  color: ${secondaryTextColor};

  ${(props) =>
    props.type === "file" &&
    `
    ::-webkit-file-upload-button {
      visibility: hidden;
    }
    
    ::before {
    content: "choose a file";
    display: inline-block;
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid ${mainColorTheme};
    border-radius: 4px;
    padding: 5px 8px;
    outline: none;
    white-space: nowrap;
    cursor: pointer;
    font-weight: 500;
    font-size: 10pt;
  }
  `}

  &:focus,
  &:hover,
  &:active {
    outline: 1px solid ${mainColorTheme}33;
  }
`;
