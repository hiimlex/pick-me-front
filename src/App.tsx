import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
