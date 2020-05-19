import React, { useState } from "react";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { s_getTodos, s_getTodosVariables } from "../../generated/s_getTodos";

const S_GET_TODOS = gql`
  subscription s_getTodos($limit: Int!) {
    todos(limit: $limit) {
      id
      todo
      done
      updated_at
      user {
        id
        display_name
        avatar_url
      }
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($todo: todos_insert_input!) {
    insert_todos_one(object: $todo) {
      id
    }
  }
`;

export interface ITodosProps {}

export function Todos(props: ITodosProps) {
  const [todoInput, setTodoInput] = useState("");

  const { loading, data } = useSubscription<s_getTodos, s_getTodosVariables>(
    S_GET_TODOS,
    {
      variables: { limit: 123 },
    }
  );

  const [
    addTodo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_TODO);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let d;
    d = await addTodo({
      variables: {
        todo: {
          todo: todoInput,
        },
      },
    });
    console.log({ d });

    setTodoInput("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {data?.todos.map((todo) => {
          return <div key={todo.id}>{todo.todo}</div>;
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todoInput}
          onChange={(e) => {
            setTodoInput(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </div>
  );
}
