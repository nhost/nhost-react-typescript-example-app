import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import BaseRouter from './Routes/BaseRouter';
import UserProvider from './Contexts/User/UserProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

import theme from './style/theme';
import './style/style.css';

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <BaseRouter />
      </UserProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
