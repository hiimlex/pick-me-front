import styled from "styled-components";
import { backgroundColorTheme, mainTextColor } from "../../styles/theme";

export const ModalOverlay = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  background: #00000022;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  background: ${backgroundColorTheme};
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const ModalTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${mainTextColor};
`;
