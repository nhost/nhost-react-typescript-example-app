import React from "react";
import ReactDOM from "react-dom";
import BaseRouter from "./routers/BaseRouter";
import { AuthContextProvider } from "./contexts/auth";
import * as serviceWorker from "./serviceWorker";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import { SnackbarProvider } from "notistack";

import theme from "./style/theme";
import "./style/style.css";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <CssBaseline />
        <AuthContextProvider>
          <BaseRouter />
        </AuthContextProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
