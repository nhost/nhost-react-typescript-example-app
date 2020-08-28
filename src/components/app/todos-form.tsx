import React, { useState } from "react";
import { TextField } from "components/ui";
import { INSERT_TODO } from "gql/todos";
import { useMutation } from "@apollo/client";

export interface ITodosFormProps {}

export function TodosForm(props: ITodosFormProps) {
  const [todoInput, setTodoInput] = useState("");

  const [
    addTodo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(INSERT_TODO);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addTodo({
        variables: {
          todo: {
            todo: todoInput,
          },
        },
      });
    } catch (error) {
      // error, we'll catch this error in `mutationError`.
    }

    setTodoInput("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          autoFocus
          variant="outlined"
          required
          fullWidth
          id="todo"
          label="Todo"
          placeholder="What needs to be done?"
          onChange={(e: any) => setTodoInput(e.target.value)}
          value={todoInput}
          disabled={mutationLoading}
        />
      </form>

      {mutationError && (
        <div className="mt-6 p-3 bg-red-200">
          <div className="mb-2 font-bold">Error:</div>
          {mutationError.message}
        </div>
      )}
    </div>
  );
}
