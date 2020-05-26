import gql from "graphql-tag";

export const GET_FILES = gql`
  query getFiles($limit: Int!) {
    files(limit: $limit) {
      id
      created_at
      file_path
      downloadable_url
    }
  }
`;

export const S_GET_FILES = gql`
  subscription s_getFiles($limit: Int!) {
    files(limit: $limit, order_by: { created_at: desc }) {
      id
      created_at
      file_path
      downloadable_url
    }
  }
`;

export const INSERT_FILE = gql`
  mutation insertFile($file: files_insert_input!) {
    insert_files_one(object: $file) {
      id
    }
  }
`;

export const DELETE_FILES = gql`
  mutation deleteFiles($where: files_bool_exp!) {
    delete_files(where: $where) {
      affected_rows
    }
  }
`;
