/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getTodos
// ====================================================

export interface getTodos_todos {
  __typename: "todos";
  id: gql_uuid;
  todo: string;
  done: boolean;
  updated_at: gql_timestamptz;
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
