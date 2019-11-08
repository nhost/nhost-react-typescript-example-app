import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import config from '../config';
import github from '../images/github.png';
import google from '../images/google.png';
import facebook from '../images/facebook.png';

import { auth } from '../nhost';

const S = {};
S.Signin = styled.div`
{
  display: grid;
  grid-template-columns: [full-start] minmax(10px, 1fr) [main-start] minmax(min-content, 440px) [main-end] minmax(10px, 1fr) [full-end];

  .main-container {
    grid-column: main;
    padding-top: 4rem;
  }

  .top-center {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .signup-form-container {
    display: grid;
    grid-row-gap: 1rem;
  }

  .submit-button {
    display: flex;

    .loading {
      margin-right: 1rem;
    }
  }

  .or-signup-with {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
  }

  .auth-providers {

    a {
      color: #000;
    }

    .provider-container {
      display: flex;
      align-items: center;
      border-radius: 4px;
      border: 1px solid #b1b1b1;
      line-height: 0;
      margin-bottom: 1rem;

      &:hover {
        background: #eeeeee;
      }

      .logo {
        padding: 1rem;
        border-right: 1px solid #b1b1b1;
        img {
          width: 32px;
          height: 32px;
        }
      }

      .text {
        flex: 1;
        margin-left: 2rem;
        text-transform: uppercase;
        letter-spacing: .7px;
        font-size: 15px;
      }
    }

  }

  .error-container {
    margin-top: 1rem;
    background-color: #ffbdbf;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
  }

  .bottom-info {
    margin-top: 1rem;
  }
}
`;

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      error: false,
      error_msg: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  async onFormSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true,
      error: false,
      error_msg: '',
    });

    const {
      username,
      password,
    } = this.state;

    try {
      await auth.login(username, password);
    } catch (e) {
      console.error(e);

      let error_msg = 'unknown error';
      try {
        error_msg = e.data.message;
      } catch (e) {
        //noop
      }

      this.setState({
        loading: false,
        error: true,
        error_msg,
      });
      return;
    }
  }

  render() {
    return (
      <S.Signin>
        <div className="main-container">
          <div className="top-center">
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <div className="top-center">
            <Typography component="h1" variant="h5">
              Nhost Example Sign In
            </Typography>
          </div>
          <form
            onSubmit={this.onFormSubmit}
          >
            <div className="signup-form-container">
              <TextField
                autoFocus
                autoComplete="email"
                type="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                onChange={e => this.setState({username: e.target.value})}
                value={this.state.username}
              />

              <TextField
                autoComplete="password"
                type="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                onChange={e => this.setState({password: e.target.value})}
                value={this.state.password}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={this.state.loading}
                className="submit-button"
              >
                {this.state.loading &&
                  <CircularProgress className="loading" size={20} />
                }
                Sign in
              </Button>

            </div>
          </form>
          {this.state.error &&
            <div className="error-container">
              {this.state.error_msg}
            </div>
          }
          <div className="or-signup-with">
            OR SIGN IN WITH
          </div>
          <div className="auth-providers">
            <a href={`${config.BACKEND_ENDPOINT}/auth/github`}>
              <div className="provider-container">
                <div className="logo">
                  <img src={github} alt="github" />
                </div>
                <div className="text">
                  Sign in with Github
                </div>
              </div>
            </a>
            <a href={`${config.BACKEND_ENDPOINT}/auth/google`}>
              <div className="provider-container">
                <div className="logo">
                  <img src={google} alt="google" />
                </div>
                <div className="text">
                  Sign in with Google
                </div>
              </div>
            </a>
            <a href={`${config.BACKEND_ENDPOINT}/auth/facebook`}>
              <div className="provider-container">
                <div className="logo">
                  <img src={facebook} alt="facebook" />
                </div>
                <div className="text">
                  Sign in with Facebook
                </div>
              </div>
            </a>
          </div>
          <div className="bottom-info">
            <Link to="/signup">Don't have an account? Sign Up!</Link>
          </div>
        </div>
      </S.Signin>
    );
  }
}

export default Signin;
