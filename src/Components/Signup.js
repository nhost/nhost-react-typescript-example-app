import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import config from '../config';
import github from '../images/github.png';
import google from '../images/google.png';
import facebook from '../images/facebook.png';

import nhost from '../nhost';

const S = {};
S.Register = styled.div`
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

  .name-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
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

  .bottom-info {
    user-select: none;
    margin-top: 1rem;
  }

  .registration-ok {
    text-align: center;

    .registration-ok-text {
      margin-bottom: 10px;
    }
  }
}
`;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      username: '',
      password: '',
      marketing: false,
      loading: false,
      error: false,
      error_msg: '',
      registration_ok: false,
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  async onFormSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const {
      fname,
      lname,
      username,
      password,
      marketing,
    } = this.state;

    // optional variable
    const register_data = {
      fname,
      lname,
      marketing,
    };

    const email = username;

    try {
      await nhost.register(email, username, password, register_data);
    } catch (e) {

      let error_msg = 'unknown error';
      try {
        error_msg = e.data.message;
      } catch (e) {
        //noop
      }

      return this.setState({
        loading: false,
        error: true,
        error_msg,
      });
    }

    this.setState({
      loading: false,
      error: false,
      error_msg: '',
      registration_ok: true,
    });
  }

  renderLoginContent() {

    if (this.state.registration_ok) {
      return (
        <div className="registration-ok">
          <div className="registration-ok-text">
            Registration completed.
          </div>
          <Button
            component={Link}
            to={`/`}
            variant="contained"
            color="primary"
            type="submit"
          >
            Sign In
          </Button>

        </div>
      );
    }
    return (
      <>
        <form
          onSubmit={this.onFormSubmit}
        >
          <div className="signup-form-container">
            <div className="name-container">

              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={e => this.setState({fname: e.target.value})}
                value={this.state.fname}
                autoFocus
              />

              <TextField
                autoComplete="fname"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                onChange={e => this.setState({lname: e.target.value})}
                value={this.state.lname}
              />

            </div>

            <TextField
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

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value={this.state.marketing}
                  onClick={() => {
                    this.setState({
                      marketing: !this.state.marketing,
                    });
                  }}
                />
              }
              label="I want to receive inspiration, marketing promotions and updates via email."
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign up
            </Button>

          </div>
        </form>
        <div className="or-signup-with">
          OR SIGN UP WITH
        </div>
        <div className="auth-providers">
          <a href={`${config.BACKEND_ENDPOINT}/auth/github`}>
            <div className="provider-container">
              <div className="logo">
                <img src={github} alt="github" />
              </div>
              <div className="text">
                Sign up with Github
              </div>
            </div>
          </a>
          <a href={`${config.BACKEND_ENDPOINT}/auth/google`}>
            <div className="provider-container">
              <div className="logo">
                <img src={google} alt="google" />
              </div>
              <div className="text">
                Sign up with Google
              </div>
            </div>
          </a>
          <a href={`${config.BACKEND_ENDPOINT}/auth/facebook`}>
            <div className="provider-container">
              <div className="logo">
                <img src={facebook} alt="facebook" />
              </div>
              <div className="text">
                Sign up with Facebook
              </div>
            </div>
            </a>
          </div>
        <div className="bottom-info">
          <Link to="/">Already have an account? Sign In!</Link>
        </div>
      </>
    );
  }

  render() {
    return (
      <S.Register>
        <div className="main-container">
          <div className="top-center">
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <div className="top-center">
            <Typography component="h1" variant="h5">
              Nhost Example Sign Up
            </Typography>
          </div>
          {this.renderLoginContent()}
        </div>
      </S.Register>
    );
  }
}

export default Register;
