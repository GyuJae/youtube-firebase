import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";
import { AuthProvider } from "./contexts/Auth";
import { UploadModalProvider } from "./contexts/UploadModal";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UploadModalProvider>
          <GlobalStyle />
          <App />
        </UploadModalProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
