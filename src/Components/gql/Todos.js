import gql from 'graphql-tag';


const TODO_FRAGMENT = gql`
  fragment TodoFragment on todos {
    id
    todo
    done
    created_at
    updated_at
  }
`;

export const GET_TODOS = gql`
query {
  todos (
    order_by: { created_at: desc }
  ) {
    ...TodoFragment
  }
}
${TODO_FRAGMENT}
`;

// same as GET_TODOS but with subscription (realtime)
export const S_GET_TODOS = gql`
subscription {
  todos (
    order_by: { created_at: desc }
  ) {
    ...TodoFragment
  }
}
${TODO_FRAGMENT}
`;

export const INSERT_TODO = gql`
mutation (
  $todo: todos_insert_input!
) {
  insert_todos (
    objects: [$todo]
  ) {
    returning {
      ...TodoFragment
    }
  }
}
${TODO_FRAGMENT}
`;

export const UPDATE_TODO = gql`
mutation (
  $id: uuid!
  $todo: todos_set_input!
) {
  update_todos (
    where: { id: { _eq: $id }}
    _set: $todo
  ) {
    returning {
      ...TodoFragment
    }
  }
}
${TODO_FRAGMENT}
`;

export const CLEAR_COMPLETED = gql`
mutation {
  delete_todos (
    where: { done: { _eq: true }}
  ) {
    returning {
      id
    }
  }
}
`;
