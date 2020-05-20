/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: s_getFiles
// ====================================================

export interface s_getFiles_files {
  __typename: "files";
  id: gql_uuid;
  created_at: gql_timestamptz;
  file_path: string;
  downloadable_url: string;
}

export interface s_getFiles {
  /**
   * fetch data from the table: "files"
   */
  files: s_getFiles_files[];
}

export interface s_getFilesVariables {
  limit: number;
}
