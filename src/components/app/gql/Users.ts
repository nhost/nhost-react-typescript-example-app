import gql from "graphql-tag";

export const S_USER_GET_SELF = gql`
  subscription s_userGetSelf($id: uuid!) {
    users_by_pk(id: $id) {
      id
      display_name
      avatar_url
      account {
        email
      }
    }
  }
`;
