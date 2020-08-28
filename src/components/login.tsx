import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { BACKEND_ENDPOINT } from "utils/config";
import { auth } from "utils/nhost";
import { Button, TextField } from "components/ui";
import github from "images/github.png";
import google from "images/google.png";
import facebook from "images/facebook.png";
import { SvgLoading } from "components/svg";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.login(email, password);
    } catch (err) {
      try {
        setError(err.response.data.message);
      } catch (error) {
        setError(err.message);
      }
      return;
    } finally {
      setLoading(false);
    }

    setLoading(false);
    history.push("/");
  };

  return (
    <div className="max-w-lg mx-auto pt-12">
      <h1 className="w-full text-center text-2xl mb-3">Nhost Example Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="signup-form-container">
          <TextField
            autoFocus
            placeholder="Email"
            autoComplete="email"
            className="block mb-3"
            type="email"
            required
            fullWidth
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <div>
            <TextField
              placeholder="Password"
              autoComplete="password"
              type="password"
              className="block mb-3"
              required
              fullWidth
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>

          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading && <SvgLoading className="w-6 h-6 mr-4" />}
              Sign in
            </Button>
          </div>
        </div>
      </form>
      {error && <div className="my-4 p-4 bg-red-200">{error}</div>}
      {/* <div className="or-signup-with">OR SIGN IN WITH</div> */}

      <div className="w-full text-center uppercase text-gray-600 py-8">
        or sign in with
      </div>
      <div className="mb-8">
        <a
          className="flex rounded border hover:bg-gray-100 hover:shadow transition ease-in-out duration-200 mb-4"
          href={`${BACKEND_ENDPOINT}/auth/providers/github`}
        >
          <img className="p-3 border-r" src={github} alt="github" />
          <div className="flex items-center text-xl pl-3">
            Sign in with Github
          </div>
        </a>
        <a
          className="flex rounded border hover:bg-gray-100 hover:shadow transition ease-in-out duration-200 mb-4"
          href={`${BACKEND_ENDPOINT}/auth/providers/google`}
        >
          <img className="p-3 border-r" src={google} alt="google" />
          <div className="flex items-center text-xl pl-3">
            Sign in with Google
          </div>
        </a>
        <a
          className="flex rounded border hover:bg-gray-100 hover:shadow transition ease-in-out duration-200 mb-4"
          href={`${BACKEND_ENDPOINT}/auth/providers/facebook`}
        >
          <img className="p-3 border-r" src={facebook} alt="facebook" />
          <div className="flex items-center text-xl pl-3">
            Sign in with Facebook
          </div>
        </a>
      </div>
      <div className="text-center">
        <div className="mb-2">
          Don't have an account?{" "}
          <Link className="text-indigo-700" to="/register">
            Sign Up!
          </Link>
        </div>
        <div>
          <Link className="text-indigo-700" to="/password-forgot">
            Forgot password
          </Link>
        </div>
      </div>
    </div>
  );
}
