import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { BACKEND_ENDPOINT } from "utils/config";
import { auth } from "utils/nhost";
import { Avatar, Button, TextField } from "components/ui";
import github from "images/github.png";
import google from "images/google.png";
import facebook from "images/facebook.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [error, setError] = useState({
    error: false,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.login(email, password);
    } catch (error) {
      setLoading(false);

      // get error message from response, if available
      let error_message;
      try {
        error_message = error.response.data.message;
      } catch (error) {
        error_message = error.message;
      }

      return setError({
        error: true,
        message: error_message,
      });
    }

    setLoading(false);
    history.push("/");
  };

  return (
    <div>
      <div className="main-container">
        <div className="top-center">
          <Avatar>LOCK</Avatar>
        </div>
        <div className="top-center">
          <h1>Nhost Example Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-container">
            <TextField
              autoFocus
              autoComplete="email"
              type="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              label="E-mail"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <TextField
              autoComplete="password"
              type="password"
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading && <div>loading</div>}
              Sign in
            </Button>
          </div>
        </form>
        {error.error && <div className="error-container">{error.message}</div>}
        {/* <div className="or-signup-with">OR SIGN IN WITH</div> */}

        <div className="or-signup-with">OR SIGN IN WITH</div>
        <div className="auth-providers">
          <a href={`${BACKEND_ENDPOINT}/auth/providers/github`}>
            <div className="provider-container">
              <div className="logo">
                <img src={github} alt="github" />
              </div>
              <div className="text">Sign in with Github</div>
            </div>
          </a>
          <a href={`${BACKEND_ENDPOINT}/auth/providers/google`}>
            <div className="provider-container">
              <div className="logo">
                <img src={google} alt="google" />
              </div>
              <div className="text">Sign in with Google</div>
            </div>
          </a>
          <a href={`${BACKEND_ENDPOINT}/auth/providers/facebook`}>
            <div className="provider-container">
              <div className="logo">
                <img src={facebook} alt="facebook" />
              </div>
              <div className="text">Sign in with Facebook</div>
            </div>
          </a>
        </div>
        <div className="bottom-info">
          <Link to="/register">Don't have an account? Sign Up!</Link>
          <Link to="/password-forgot">Forgot password</Link>
        </div>
      </div>
    </div>
  );
}
