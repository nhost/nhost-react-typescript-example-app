import React from "react";
import { useHistory } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import { S_USER_GET_SELF } from "gql/users";
import { s_userGetSelf } from "generated/s_userGetSelf";
import { auth } from "utils/nhost";

export interface IHeaderUserProps {}

export function HeaderUser() {
  const history = useHistory();

  const user_id = auth.getClaim("x-hasura-user-id");

  const { loading, error, data } = useSubscription<s_userGetSelf>(
    S_USER_GET_SELF,
    {
      variables: {
        id: user_id,
      },
    }
  );

  if (loading) return <div>Loading..</div>;
  if (!data?.users_by_pk || error) {
    return <div>Unable to load user</div>;
  }

  const user = data.users_by_pk;

  return (
    <div className="flex items-center h-full">
      {user.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={`Avatar`}
          className="rounded-full w-8 h-8"
        />
      ) : (
        // <AccountCircle className="avatar-image" />
        <div className="rounded-full bg-indigo-500 w-8 h-8"></div>
      )}
      <div className="ml-4">
        {user.display_name}
        <span
          className="ml-4 rounded p-3 hover:bg-gray-200 cursor-pointer"
          onClick={() => {
            auth.logout();
            history.push("/");
          }}
        >
          Logout
        </span>
      </div>
    </div>
  );
}
