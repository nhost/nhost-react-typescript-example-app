/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTodos
// ====================================================

export interface getTodos_todos_user {
  __typename: "users";
  id: gql_uuid;
  display_name: string | null;
  avatar_url: string | null;
}

export interface getTodos_todos {
  __typename: "todos";
  id: gql_uuid;
  todo: string;
  done: boolean;
  updated_at: gql_timestamptz;
  /**
   * An object relationship
   */
  user: getTodos_todos_user;
}

export interface getTodos {
  /**
   * fetch data from the table: "todos"
   */
  todos: getTodos_todos[];
}

export interface getTodosVariables {
  limit: number;
}
