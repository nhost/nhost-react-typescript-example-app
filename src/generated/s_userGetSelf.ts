/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: s_userGetSelf
// ====================================================

export interface s_userGetSelf_users_by_pk_account {
  __typename: "auth_accounts";
  email: gql_citext | null;
}

export interface s_userGetSelf_users_by_pk {
  __typename: "users";
  id: gql_uuid;
  display_name: string | null;
  avatar_url: string | null;
  /**
   * An object relationship
   */
  account: s_userGetSelf_users_by_pk_account | null;
}

export interface s_userGetSelf {
  /**
   * fetch data from the table: "users" using primary key columns
   */
  users_by_pk: s_userGetSelf_users_by_pk | null;
}

export interface s_userGetSelfVariables {
  id: gql_uuid;
}
