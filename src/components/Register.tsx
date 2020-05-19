import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

import * as config from "../config";
import github from "../images/github.png";
import google from "../images/google.png";
import facebook from "../images/facebook.png";
import { auth } from "src/nhost";

const S_REGISTER = styled.div`
  display: grid;
  grid-template-columns:
    [full-start] minmax(10px, 1fr) [main-start] minmax(min-content, 440px)
    [main-end] minmax(10px, 1fr) [full-end];
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
        letter-spacing: 0.7px;
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
`;

export interface IRegisterProps {}

export function Register(props: IRegisterProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("elitasson@gmail.com");
  const [password, setPassword] = useState("hejsan");
  const [marketing, setMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const history = useHistory();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.register(email, password, { firstName, lastName, marketing });
    } catch (error) {
      setLoading(false);

      // get error message from response, if available
      let error_message;
      try {
        error_message = error.response.data.message;
      } catch (error) {
        error_message = "Unable to register account";
      }

      return setError({
        error: true,
        message: error_message,
      });
    }

    history.push("/");

    setLoading(false);
  };

  return (
    <S_REGISTER>
      <div className="main-container">
        <div className="top-center">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
        </div>
        <div className="top-center">
          <Typography component="h1" variant="h5">
            Nhost Example Register
          </Typography>
        </div>
        <form onSubmit={onSubmit}>
          <div className="signup-form-container">
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <TextField
              autoComplete="fname"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              autoComplete="email"
              type="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value={marketing}
                  onClick={() => {
                    setMarketing(!marketing);
                  }}
                />
              }
              label="I want to receive inspiration, marketing promotions and updates via email."
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading && <CircularProgress className="loading" size={20} />}
              Sign in
            </Button>
          </div>
        </form>
        {error.error && <div className="error-container">{error.message}</div>}
        {/* <div className="or-signup-with">OR SIGN IN WITH</div> */}

        <div className="or-signup-with">OR SIGN IN WITH</div>
        <div className="auth-providers">
          <a href={`${config.BACKEND_ENDPOINT}/auth/github`}>
            <div className="provider-container">
              <div className="logo">
                <img src={github} alt="github" />
              </div>
              <div className="text">Sign in with Github</div>
            </div>
          </a>
          <a href={`${config.BACKEND_ENDPOINT}/auth/google`}>
            <div className="provider-container">
              <div className="logo">
                <img src={google} alt="google" />
              </div>
              <div className="text">Sign in with Google</div>
            </div>
          </a>
          <a href={`${config.BACKEND_ENDPOINT}/auth/facebook`}>
            <div className="provider-container">
              <div className="logo">
                <img src={facebook} alt="facebook" />
              </div>
              <div className="text">Sign in with Facebook</div>
            </div>
          </a>
        </div>
        <div className="bottom-info">
          <Link to="/login">Already have an account? Sign in!</Link>
        </div>
      </div>
    </S_REGISTER>
  );
}
