import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, Snackbar, IconButton } from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";
import { auth } from "../../nhost";

const SettingsContainer = styled.div`
  margin-top: 1rem;

  .settings-container {
    border: 1px solid #1f89f0;
    border-radius: 5px;
    padding: 2rem;
    margin-bottom: 3rem;

    .settings-contianer-header {
      font-weight: bold;
      color: #1f89f0;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }

    .settings-container-input {
      margin-top: 1rem;
    }

    .settings-container-button {
      margin-top: 1rem;
    }
  }
`;

function SettingsNewEmail() {
  const [email, setEmail] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();

    await auth.changeEmailRequest(email);

    setSnackbarOpen(true);
  }

  function handleClose() {
    setSnackbarOpen(false);
  }

  return (
    <div className="settings-container">
      <div className="settings-contianer-header">New email</div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          required
          fullWidth
          label="New email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="settings-container-input"
          size="small"
        />
        <Button
          variant="outlined"
          // color="primary"
          type="submit"
          className="settings-container-button"
        >
          Set new email
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message="A confirmation mail has been sent to the new email"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </form>
    </div>
  );
}

function SettingsNewPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  return (
    <div className="settings-container">
      <div className="settings-contianer-header">New Password</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("set new password");
        }}
      >
        <TextField
          variant="outlined"
          required
          fullWidth
          label="Old password"
          onChange={(e) => setOldPassword(e.target.value)}
          value={oldPassword}
          className="settings-container-input"
          size="small"
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          label="New password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          className="settings-container-input"
          size="small"
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          label="New password (again)"
          onChange={(e) => setNewPassword2(e.target.value)}
          value={newPassword2}
          className="settings-container-input"
          size="small"
        />

        <Button
          variant="outlined"
          // color="primary"
          type="submit"
          className="settings-container-button"
        >
          Set new email
        </Button>
      </form>
    </div>
  );
}

export interface ISettingsProps {}

export function Settings(props: ISettingsProps) {
  return (
    <SettingsContainer>
      <SettingsNewEmail />
      <SettingsNewPassword />
    </SettingsContainer>
  );
}
