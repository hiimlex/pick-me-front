import { createGlobalStyle, GlobalStyleComponent } from "styled-components";
import { backgroundColorTheme, mainTextColor } from "./theme";

const GlobalStyle: GlobalStyleComponent<any, any> = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
    background-color: ${backgroundColorTheme};
    color: ${mainTextColor};

    * {
      font-family: 'Montserrat', sans-serif;
    }
  }
`;

export default GlobalStyle;
