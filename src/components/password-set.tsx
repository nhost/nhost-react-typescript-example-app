import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, TextField } from "components/ui";
import { auth } from "utils/nhost";
import { SvgLoading } from "components/svg";

export function PasswordSet() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const { ticket } = useParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await auth.changePasswordChange(password, ticket);
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
        Password updated! Now <Link to="/login">Sign In!</Link>
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
            placeholder="New password"
            autoComplete="password"
            className="block mb-3"
            type="password"
            required
            fullWidth
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
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
              Set new password
            </Button>
          </div>
        </div>
      </form>
      {error && <div className="my-4 p-4 bg-red-200">{error}</div>}
    </div>
  );
}
