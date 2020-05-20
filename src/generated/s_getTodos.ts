/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: s_getTodos
// ====================================================

export interface s_getTodos_todos {
  __typename: "todos";
  id: gql_uuid;
  todo: string;
  done: boolean;
  updated_at: gql_timestamptz;
}

export interface s_getTodos {
  /**
   * fetch data from the table: "todos"
   */
  todos: s_getTodos_todos[];
}

export interface s_getTodosVariables {
  limit: number;
}
