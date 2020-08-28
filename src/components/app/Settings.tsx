import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { TextField, Button } from "components/ui";
import { auth } from "utils/nhost";
// import { useSnackbar } from "notistack";
import { S_USER_GET_SELF } from "gql/users";
import { s_userGetSelf } from "generated/s_userGetSelf";

function SettingsCurrent() {
  const user_id = auth.getClaim("x-hasura-user-id");
  const { loading, error, data } = useSubscription<s_userGetSelf>(
    S_USER_GET_SELF,
    {
      variables: {
        id: user_id,
      },
    }
  );

  if (loading) {
    return <div>Loading..</div>;
  }

  if (error || !data?.users_by_pk) {
    return <div>Unable to load settings</div>;
  }

  return <div>Email: {data.users_by_pk.account?.email}</div>;
}

function SettingsNewEmail() {
  const [email, setEmail] = useState("");

  // const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await auth.changeEmailRequest(email);
    } catch (error) {
      return;
      // return enqueueSnackbar("Unable to send email", {
      //   variant: "error",
      // });
    }

    setEmail("");
    // return enqueueSnackbar(
    //   "We have sent you an email to your new email for you to confirm.",
    //   {
    //     variant: "success",
    //   }
    // );
  }

  return (
    <div className="settings-container">
      <div className="settings-contianer-header">New email</div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          required
          fullWidth
          type="email"
          label="New email"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
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
      </form>
    </div>
  );
}

function SettingsNewPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  // const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: any) {
    e.preventDefault();

    if (newPassword !== newPassword2) {
      return;
      // return enqueueSnackbar("New password does not match", {
      //   variant: "error",
      // });
    }

    try {
      await auth.changePassword(oldPassword, newPassword);
    } catch (error) {
      let error_message = "Unable to change password";
      try {
        error_message = error.response.data.message;
      } catch (error) {}
      return;
      // return enqueueSnackbar(error_message, {
      //   variant: "error",
      // });
    }

    setOldPassword("");
    setNewPassword("");
    setNewPassword2("");

    // return enqueueSnackbar("New password set", {
    //   variant: "success",
    // });
  }

  return (
    <div className="settings-container">
      <div className="settings-contianer-header">New Password</div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          required
          fullWidth
          type="password"
          label="Old password"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setOldPassword(e.target.value)
          }
          value={oldPassword}
          className="settings-container-input"
          size="small"
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          type="password"
          label="New password"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setNewPassword(e.target.value)
          }
          value={newPassword}
          className="settings-container-input"
          size="small"
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          type="password"
          label="New password (again)"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setNewPassword2(e.target.value)
          }
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
          Set new password
        </Button>
      </form>
    </div>
  );
}

export interface ISettingsProps {}

export function Settings(props: ISettingsProps) {
  return (
    <div>
      <div className="settings-container">
        <div className="settings-contianer-header">Current settings</div>
        <SettingsCurrent />
      </div>
      <SettingsNewEmail />
      <SettingsNewPassword />
    </div>
  );
}
