import { createGlobalStyle, GlobalStyleComponent } from "styled-components";

const GlobalStyle: GlobalStyleComponent<{}, any> = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
  }
`;

export default GlobalStyle;
