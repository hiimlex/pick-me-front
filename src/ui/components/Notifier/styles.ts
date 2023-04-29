import styled from "styled-components";
import { NotifierType, mainTextColor, notifierTypes } from "../../styles/theme";
import { NotifierPosition } from "./index";

export const NotifierContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotificationContent = styled.div<{
  type: NotifierType;
  position: NotifierPosition;
}>`
  background: ${notifierTypes};
  padding: 8px 14px;
  width: fit-content;
  position: fixed;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  color: ${mainTextColor};

  display: block;

  z-index: 9;

  ${({ type }) =>
    type === "error" &&
    `
    color: #fff;
  `}

  ${({ position }) => position === "top" && `top: 24px;`}
  ${({ position }) => position === "bottom" && `bottom: 24px;`}
`;
