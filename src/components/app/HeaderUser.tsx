import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { AccountCircle } from "@material-ui/icons";
import { useSubscription } from "@apollo/react-hooks";
import { S_USER_GET_SELF } from "./gql/Users";
import { s_userGetSelf } from "src/generated/s_userGetSelf";
import { auth } from "src/nhost";

const HeaderUserContainer = styled.div`
  display: flex;
  align-items: center;

  .avatar-image {
    border-radius: 50%;
    width: 24px;
  }

  .user-info {
    padding-left: 1rem;
  }

  .logout-link {
    cursor: pointer;
  }
`;

export interface IHeaderUserProps {}

export function HeaderUser(props: IHeaderUserProps) {
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
    <HeaderUserContainer>
      {user.avatar_url ? (
        <img src={user.avatar_url} alt={`Avatar`} className="avatar-image" />
      ) : (
        <AccountCircle className="avatar-image" />
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
    </HeaderUserContainer>
  );
}
