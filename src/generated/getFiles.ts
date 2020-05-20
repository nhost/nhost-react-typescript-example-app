/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getFiles
// ====================================================

export interface getFiles_files {
  __typename: "files";
  id: gql_uuid;
  created_at: gql_timestamptz;
  file_path: string;
  downloadable_url: string;
}

export interface getFiles {
  /**
   * fetch data from the table: "files"
   */
  files: getFiles_files[];
}

export interface getFilesVariables {
  limit: number;
}
