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

  const { loading, data } = useSubscription<s_userGetSelf>(S_USER_GET_SELF, {
    variables: {
      id: user_id,
    },
  });

  if (loading) return <div>Loading..</div>;
  if (!data?.users_by_pk) return <div>Unable to load user</div>;

  const user = data.users_by_pk;

  return (
    <div>
      {user.avatar_url ? (
        <img src={user.avatar_url} alt={`Avatar`} className="avatar-image" />
      ) : (
        // <AccountCircle className="avatar-image" />
        <div>avatar circle</div>
      )}
      <div className="user-info">
        {user.display_name},{" "}
        <span
          className="logout-link"
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
