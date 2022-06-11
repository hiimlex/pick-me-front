import { createGlobalStyle, GlobalStyleComponent } from "styled-components";
import {
  backgroundColorTheme,
  mainTextColor,
  secondaryColorTheme,
} from "./theme";

const GlobalStyle: GlobalStyleComponent<any, any> = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    scrollbar-width: auto;
    scrollbar-color: ${secondaryColorTheme};
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
    background-color: ${backgroundColorTheme};
    color: ${mainTextColor};
    outline: none;
    border: none;

    * {
      font-family: 'Montserrat', sans-serif;
    }
  }

  *::-webkit-scrollbar {
    width: 6px;
    border-radius: 12px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 12px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${secondaryColorTheme};
    border-radius: 10px;
  }
`;

export default GlobalStyle;
