import styled from "styled-components";
import { mainColorTheme } from "../../styles/theme";

export const LogoContent = styled.div<{ fontSize: string; clickable: boolean }>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: 400;
  color: ${mainColorTheme};

  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
`;
