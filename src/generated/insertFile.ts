/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { files_insert_input } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: insertFile
// ====================================================

export interface insertFile_insert_files_one {
  __typename: "files";
  id: gql_uuid;
}

export interface insertFile {
  /**
   * insert a single row into the table: "files"
   */
  insert_files_one: insertFile_insert_files_one | null;
}

export interface insertFileVariables {
  file: files_insert_input;
}
