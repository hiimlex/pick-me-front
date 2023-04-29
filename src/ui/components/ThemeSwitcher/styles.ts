import styled from "styled-components";
import { mainColorTheme, secondaryColorTheme } from "../../styles/theme";

export const ThemeSwitcherContainer = styled.div<{
  width?: string;
  scale?: number;
}>`
  width: ${(props) => props.width || "32px"};
  height: ${(props) => props.width || "32px"};
  padding: 12px;

  margin-left: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  border-radius: 50%;
  background-color: ${mainColorTheme};

  transition: all 0.1s ease-in-out;

  &:hover {
    background-color: ${secondaryColorTheme};
    
    .icon{
      color: ${mainColorTheme};
    }
  }

  .icon {
    color: ${secondaryColorTheme};
    transform: scale(${(props) => props.scale || 2});
  }
`;
