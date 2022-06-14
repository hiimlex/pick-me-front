import styled from "styled-components";
import { mainColorTheme, mainTextColor } from "../../styles/theme";

export const UserControlContainer = styled.div`
  position: relative;
  margin-right: 24px;
`;

export const UserControlPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  border: 1px solid ${mainColorTheme};
  padding: 8px;
  font-weight: 500;
  color: ${mainTextColor};
  border-radius: 12px;
  cursor: pointer;

  .icon {
    margin-left: 8px;
    transform: scale(0.7);
  }

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${mainColorTheme}33;
  }
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 8;
  border: 1px solid ${mainColorTheme};

  right: 0;
  top: 52px;
  border-radius: 12px;
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
