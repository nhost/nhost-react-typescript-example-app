/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { todos_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addTodo
// ====================================================

export interface addTodo_insert_todos_one {
  __typename: "todos";
  id: gql_uuid;
}

export interface addTodo {
  /**
   * insert a single row into the table: "todos"
   */
  insert_todos_one: addTodo_insert_todos_one | null;
}

export interface addTodoVariables {
  todo: todos_insert_input;
}
