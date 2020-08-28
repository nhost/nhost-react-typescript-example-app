import gql from "graphql-tag";

export const GET_TODOS = gql`
  query getTodos($limit: Int!) {
    todos(limit: $limit) {
      id
      todo
      done
      updated_at
    }
  }
`;

export const S_GET_TODOS = gql`
  subscription s_getTodos($limit: Int!) {
    todos(limit: $limit, order_by: { created_at: desc }) {
      id
      todo
      done
      updated_at
    }
  }
`;

export const INSERT_TODO = gql`
  mutation insertTodo($todo: todos_insert_input!) {
    insert_todos_one(object: $todo) {
      id
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo($id: uuid!, $todo: todos_set_input!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: $todo) {
      id
      todo
      done
    }
  }
`;

export const DELETE_TODOS = gql`
  mutation deleteTodos($where: todos_bool_exp!) {
    delete_todos(where: $where) {
      affected_rows
    }
  }
`;
