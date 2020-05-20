/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { files_bool_exp } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteFiles
// ====================================================

export interface deleteFiles_delete_files {
  __typename: "files_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface deleteFiles {
  /**
   * delete data from the table: "files"
   */
  delete_files: deleteFiles_delete_files | null;
}

export interface deleteFilesVariables {
  where: files_bool_exp;
}
