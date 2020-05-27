import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Button, TextField } from "@material-ui/core/";
import { auth } from "../nhost";

const PasswordForgotContainer = styled.div`
  display: grid;
  grid-template-columns:
    [full-start] minmax(10px, 1fr) [main-start] minmax(min-content, 440px)
    [main-end] minmax(10px, 1fr) [full-end];
  .main-container {
    grid-column: main;
    padding-top: 4rem;

    .top-center {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .signup-form-container {
      display: grid;
      grid-row-gap: 1rem;
    }
  }
  .error-container {
    margin-top: 1rem;
    background-color: #ffbdbf;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
  }
`;

export interface IPasswordForgotProps {}

export function PasswordForgot(props: IPasswordForgotProps) {
  const [formState, setFormState] = useState({
    completed: false,
    error: false,
    error_message: "",
    loading: false,
  });
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // reset error message
    setFormState({
      completed: false,
      error: false,
      error_message: "",
      loading: true,
    });

    // make request
    try {
      await auth.changePasswordRequest(email);
    } catch (error) {
      // set error message
      let error_message = "Server is down";
      try {
        error_message = error.response.data.message;
      } catch (error) {}
      return setFormState({
        completed: false,
        error: true,
        error_message,
        loading: false,
      });
    }

    setFormState({
      completed: true,
      error: false,
      error_message: "",
      loading: false,
    });
  };

  const renderForm = () => {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-container">
            <TextField
              autoFocus
              type="email"
              name="email"
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="submit-button"
            >
              Request new password
            </Button>
          </div>
        </form>
        {formState.error && (
          <div className="error-container">{formState.error_message}</div>
        )}
      </>
    );
  };

  const renderFormCompleted = () => {
    return <div>Perfect, we have sent you an link to your email.</div>;
  };

  return (
    <PasswordForgotContainer>
      <div className="main-container">
        <div className="top-center">
          <Typography component="h1" variant="h5">
            Forgot password
          </Typography>
        </div>
        {formState.completed ? renderFormCompleted() : renderForm()}
      </div>
    </PasswordForgotContainer>
  );
}
