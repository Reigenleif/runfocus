import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import theme from "./theme";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </ChakraProvider>
);
