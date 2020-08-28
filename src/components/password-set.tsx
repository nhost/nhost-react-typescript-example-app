import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, TextField } from "components/ui";
import { auth } from "utils/nhost";

// const PasswordSetContainer = styled.div`
//   display: grid;
//   grid-template-columns:
//     [full-start] minmax(10px, 1fr) [main-start] minmax(min-content, 440px)
//     [main-end] minmax(10px, 1fr) [full-end];
//   .main-container {
//     grid-column: main;
//     padding-top: 4rem;

//     .top-center {
//       display: flex;
//       justify-content: center;
//       margin-bottom: 1rem;
//     }

//     .signup-form-container {
//       display: grid;
//       grid-row-gap: 1rem;
//     }
//   }
//   .error-container {
//     margin-top: 1rem;
//     background-color: #ffbdbf;
//     padding: 1rem;
//     border-radius: 4px;
//     text-align: center;
//   }
// `;

export function PasswordSet() {
  const [formState, setFormState] = useState({
    completed: false,
    error: false,
    error_message: "",
    loading: false,
  });
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { ticket } = useParams();
  console.log({ ticket });

  const handleSubmit = async (e: any) => {
    console.log("handle submit");
    e.preventDefault();

    // reset error message
    setFormState({
      completed: false,
      error: false,
      error_message: "",
      loading: true,
    });

    if (password !== password2) {
      return setFormState({
        completed: false,
        error: true,
        error_message: "Passwords does not match",
        loading: false,
      });
    }

    try {
      await auth.changePasswordChange(password, ticket);
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

            <TextField
              autoComplete="password"
              type="password"
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Password (again)"
              value={password2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword2(e.target.value)
              }
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="submit-button"
            >
              Set new password
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
    return (
      <div>
        Your new password is set. You can now <Link to="/login">login</Link>.
      </div>
    );
  };

  return (
    <div>
      <div className="main-container">
        <div className="top-center">
          <h1>Set new password</h1>
        </div>
        {formState.completed ? renderFormCompleted() : renderForm()}
      </div>
    </div>
  );
}
