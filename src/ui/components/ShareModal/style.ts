import styled, { css } from "styled-components";
import {
  backgroundColorTheme,
  inputBackgroundColor,
  mainColorTheme,
  mainTextColor,
  secondaryColorTheme,
  secondaryTextColor,
} from "../../styles/theme";

export const ModalOverlay = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 42px 0;
  overflow: auto;

  background: #00000044;

  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  min-width: 320px;
  width: 40%;
  max-width: 480px;
  background: ${backgroundColorTheme};
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  padding: 18px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const ModalTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${mainTextColor};
  margin-bottom: 12px;
`;

export const ModalClose = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  width: fit-content;
  height: fit-content;

  transition: all 0.3s ease-in;

  .icon {
    stroke: ${mainTextColor};
    transform: scale(0.7);
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ModalSelect = styled.select`
  height: 38px;
  width: 100%;
  margin-bottom: 24px;
  border-radius: 12px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 18px;
  margin: 6px 0;
  background: ${inputBackgroundColor};
  color: ${secondaryTextColor};
  -webkit-appearance: none;
  -moz-appearance: none;

  option {
    font-size: 14px;
    font-weight: 500;
    padding: 2px;
  }

  display: inline-block;
  background-image: linear-gradient(
      45deg,
      transparent 50%,
      ${secondaryColorTheme} 50%
    ),
    linear-gradient(135deg, ${secondaryColorTheme} 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;

  &:focus {
    outline: 1px solid ${mainColorTheme}33;
  }
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  height: 88px;
  margin: 6px 0;
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

export const ModalGroupRadioLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  margin-top: 6px;
`;

export const ModalGroupRadio = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 6px 0;
`;

export const RadioGroup = styled.div<{ selected: boolean }>`
  display: flex;
  margin: 4px 8px;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  border: 1px solid ${({ color }) => color};
  border-radius: 12px;
  overflow: hidden;

  &:hover {
    background: ${({ color }) => color}33;
  }

  label {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    color: ${({ color }) => color};
    padding: 4px 8px;
    cursor: pointer;

    input {
      width: 100%;
      visibility: hidden; /* Makes input not-clickable */
      position: absolute; /* Remove input from document flow */
    }
  }

  ${({ selected }) => selected && selectedRadio}
`;

const selectedRadio = css`
  label {
    color: ${mainTextColor};
  }

  background: ${(props: any) =>
    props.color ? props.color : mainColorTheme} !important;
`;
