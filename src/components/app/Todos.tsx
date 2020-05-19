import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { getTodos, getTodosVariables } from "../../generated/getTodos";

const GET_TODOS = gql`
  query getTodos($limit: Int!) {
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

  const { loading, data } = useQuery<getTodos, getTodosVariables>(GET_TODOS, {
    variables: { limit: 123 },
  });
  const [addTodo] = useMutation(ADD_TODO);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let d;
    try {
      d = await addTodo({
        variables: {
          todo: {
            todo: todoInput,
          },
        },
      });
      console.log({ d });
    } catch (error) {
      console.log({ d });
      console.log("error:");
      return console.log(error);
    }
    console.log("handle form submit");
  };

  return (
    <div>
      <div>
        {data?.todos.map((todo) => {
          return <div>{todo.todo}</div>;
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
    </div>
  );
}
