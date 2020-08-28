import React, { useState } from "react";
import { useSubscription } from "@apollo/client";
import { TextField, Button } from "components/ui";
import { auth } from "utils/nhost";
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: any) {
    e.preventDefault();

    try {
      await auth.changeEmailRequest(email);
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

    setEmail("");
  }

  return (
    <div className="py-4 border-t">
      <div className="font-bold mb-2">New email</div>
      <form onSubmit={handleSubmit}>
        <TextField
          className="mb-2"
          required
          fullWidth
          type="email"
          placeholder="New email"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
          value={email}
        />
        <Button
          variant="outlined"
          disabled={loading}
          // color="primary"
          type="submit"
          className="settings-container-button"
        >
          Set new email
        </Button>
      </form>
      {error && <div className="my-4 p-4 bg-red-200">{error}</div>}
      <div className="mt-4 p-4 border rounded">
        You'll get a <i className="font-bold">ticket</i> in an email to the new
        email addres. Use the <i className="font-bold">ticket</i> as this url:{" "}
        <code className="text-sm">
          http://localhost:3000/new-email/
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

function SettingsNewPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    try {
      await auth.changePassword(oldPassword, newPassword);
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

    setOldPassword("");
    setNewPassword("");

    // return enqueueSnackbar("New password set", {
    //   variant: "success",
    // });
  }

  return (
    <div className="py-4 border-t">
      <div className="font-bold mb-2">New Password</div>
      <form onSubmit={handleSubmit}>
        <TextField
          className="mb-2"
          required
          fullWidth
          type="password"
          placeholder="Old password"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setOldPassword(e.target.value)
          }
          value={oldPassword}
        />

        <TextField
          className="mb-2"
          required
          fullWidth
          type="password"
          placeholder="New password"
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setNewPassword(e.target.value)
          }
          value={newPassword}
        />

        <Button
          variant="outlined"
          disabled={loading}
          type="submit"
          className="settings-container-button"
        >
          Set new password
        </Button>

        {error && <div className="my-4 p-4 bg-red-200">{error}</div>}
      </form>
    </div>
  );
}

export interface ISettingsProps {}

export function Settings(props: ISettingsProps) {
  return (
    <div className="max-w-xl mx-auto py-6">
      <div className="pb-6">
        <div className="font-bold">Current settings:</div>
        <SettingsCurrent />
      </div>
      <SettingsNewEmail />
      <SettingsNewPassword />
    </div>
  );
}
