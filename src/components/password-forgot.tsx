import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "components/ui";
import { auth } from "utils/nhost";
import { SvgLoading } from "components/svg";

export function PasswordForgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.changePasswordRequest(email);
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
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="text-center pt-12">
        We have sent you an email to change your password.
        <div className="mt-4 p-4 border rounded max-w-lg mx-auto">
          You'll get a <i className="font-bold">ticket</i> in an email to the
          email addres. Use the <i className="font-bold">ticket</i> as this url:{" "}
          <code className="text-sm">
            http://localhost:3000/password-set/
            <span className="font-bold">{"<ticket>"}</span>
          </code>
          .
          <br />
          <br />
          You can change your e-mail templates to match this new url. Read more
          here:{" "}
          <a
            className="text-indigo-700"
            href="https://docs.nhost.io/auth/email-templates"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://docs.nhost.io/auth/email-templates
          </a>
          .
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto pt-12">
      <h1 className="w-full text-center text-2xl mb-3">Request new password</h1>
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
              fullWidth
            >
              {loading && <SvgLoading className="w-6 h-6 mr-4" />}
              Request new password
            </Button>
          </div>
        </div>
      </form>
      {error && <div className="my-4 p-4 bg-red-200">{error}</div>}

      <div className="text-center mt-8">
        <div className="mb-2">
          Already have an account?{" "}
          <Link className="text-indigo-700" to="/login">
            Sign In!
          </Link>
        </div>
        <div className="mb-2">
          Don't have an account?{" "}
          <Link className="text-indigo-700" to="/register">
            Sign Up!
          </Link>
        </div>
      </div>
    </div>
  );
}

export interface IPasswordForgotProps {}
