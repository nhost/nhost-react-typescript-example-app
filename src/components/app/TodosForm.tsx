import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { INSERT_TODO } from "./gql/Todos";
import { useMutation } from "@apollo/react-hooks";

export interface ITodosFormProps {}

export function TodosForm(props: ITodosFormProps) {
  const [todoInput, setTodoInput] = useState("");

  const [
    addTodo,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(INSERT_TODO);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addTodo({
      variables: {
        todo: {
          todo: todoInput,
        },
      },
    });

    setTodoInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          variant="outlined"
          required
          fullWidth
          id="todo"
          label="Todo"
          placeholder="What needs to be done?"
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
        />
      </form>
    </div>
  );
}
