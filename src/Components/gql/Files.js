import gql from 'graphql-tag';

export const S_GET_FILES = gql`
subscription {
  files (
    order_by: { created_at: desc }
  ) {
    id
    file_path
    downloadable_url
  }
}
`;

export const INSERT_FILE = gql`
mutation (
  $file: files_insert_input!
) {
  insert_files (
    objects: [$file]
  ) {
    affected_rows
  }
}
`;

export const DELETE_FILE = gql`
mutation (
  $id: uuid!
) {
  delete_files (
    where: { id: { _eq: $id }}
  ) {
    affected_rows
  }
}
`;
