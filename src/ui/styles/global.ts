import styled, {
  createGlobalStyle,
  GlobalStyleComponent,
} from "styled-components";
import {
  backgroundColorTheme,
  mainColorTheme,
  mainTextColor,
  secondaryColorTheme,
} from "./theme";

const GlobalStyle: GlobalStyleComponent<any, any> = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;

    scrollbar-width: auto;
    scrollbar-color: ${secondaryColorTheme};
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 62.5%;
    background-color: ${backgroundColorTheme};
    color: ${mainTextColor};
 

    * {
      font-family: 'Montserrat', sans-serif;
    }
    

    input:-webkit-autofill,
		input:-webkit-autofill:hover,
		input:-webkit-autofill:focus,
		textarea:-webkit-autofill,
		textarea:-webkit-autofill:hover,
		textarea:-webkit-autofill:focus,
		select:-webkit-autofill,
		select:-webkit-autofill:hover,
		select:-webkit-autofill:focus {
			border: none;
			-webkit-text-fill-color: ${mainTextColor};
			transition: background-color 5000s ease-in-out 0s;
		}
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
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

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield !important;
  }
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${backgroundColorTheme};

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .loaderApp {
    stroke: ${mainColorTheme};
    animation: rotation 2s linear infinite;
    transform: scale(0) !important;
  }

  pointer-events: none;
`;

export { GlobalStyle };
