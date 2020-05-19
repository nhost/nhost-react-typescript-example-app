/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { todos_bool_exp } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteTodos
// ====================================================

export interface deleteTodos_delete_todos {
  __typename: "todos_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface deleteTodos {
  /**
   * delete data from the table: "todos"
   */
  delete_todos: deleteTodos_delete_todos | null;
}

export interface deleteTodosVariables {
  where: todos_bool_exp;
}
