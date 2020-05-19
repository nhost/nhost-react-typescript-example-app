/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { todos_set_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateTodo
// ====================================================

export interface updateTodo_update_todos_by_pk {
  __typename: "todos";
  id: gql_uuid;
  todo: string;
  done: boolean;
}

export interface updateTodo {
  /**
   * update single row of the table: "todos"
   */
  update_todos_by_pk: updateTodo_update_todos_by_pk | null;
}

export interface updateTodoVariables {
  id: gql_uuid;
  todo: todos_set_input;
}
