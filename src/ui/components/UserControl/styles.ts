import styled from "styled-components";
import { mainColorTheme, mainTextColor } from "../../styles/theme";
import { backgroundColorTheme } from "../../styles/theme";

export const UserControlContainer = styled.div`
  position: relative;
`;

export const UserControlPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  color: ${mainTextColor};
  border-radius: 8px;
  cursor: pointer;
  width: 82px;

  transition: all 0.1s ease-in-out;

  &:hover {
    color: ${mainColorTheme};
  }
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 8;
  border: 1px solid ${mainColorTheme};
  background: ${backgroundColorTheme};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: calc(100% + 12px);
  border-radius: 8px;
  overflow: hidden;
`;

export const DropdownLink = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${mainColorTheme}22;
  }
`;
