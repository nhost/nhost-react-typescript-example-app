import React, { useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";

import { Button } from "components/ui";
import { S_GET_TODOS, UPDATE_TODO, DELETE_TODOS } from "gql/todos";
import { s_getTodos, s_getTodosVariables } from "generated/s_getTodos";
import { TodosForm } from "./todos-form";
import { getTodos_todos } from "generated/getTodos";

export interface ITodosProps {}

export function Todos(props: ITodosProps) {
  const [filter, setFilter] = useState("all");

  const { loading, data } = useSubscription<s_getTodos, s_getTodosVariables>(
    S_GET_TODOS,
    {
      variables: { limit: 123 },
    }
  );
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [deleteTodos] = useMutation(DELETE_TODOS);

  const toggleTodoItem = (todo: getTodos_todos) => {
    updateTodo({
      variables: {
        id: todo.id,
        todo: {
          done: !todo.done,
        },
      },
    });
  };

  const renderTodos = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data || data.todos.length === 0) {
      return <div>No todos</div>;
    }

    const { todos } = data;

    let todos_left = 0;
    todos.forEach((todo) => {
      if (!todo.done) todos_left++;
    });

    let todos_filtered;
    if (filter === "active") {
      todos_filtered = todos.filter((todo) => {
        return todo.done === false;
      });
    } else if (filter === "completed") {
      todos_filtered = todos.filter((todo) => {
        return todo.done === true;
      });
    } else {
      // if (filter === "all") {
      todos_filtered = todos;
    }

    return (
      <div>
        {todos_filtered.map((todo) => {
          return (
            <div key={todo.id} className="todo-item-container">
              <div className="todo-check">
                <button
                  onClick={() => {
                    toggleTodoItem(todo);
                  }}
                >
                  {todo.done ? <span>done</span> : <span>not done</span>}
                </button>
              </div>
              <div className="todo-item">{todo.todo}</div>
            </div>
          );
        })}

        <div className="bottom">
          <div className="items-left">{todos_left} items left</div>
          <div className="filter-buttons">
            <Button
              onClick={() => {
                setFilter("all");
              }}
            >
              All
            </Button>
            <Button
              onClick={() => {
                setFilter("active");
              }}
            >
              Active
            </Button>
            <Button
              onClick={() => {
                setFilter("completed");
              }}
            >
              Completed
            </Button>
          </div>
          <div className="">
            <Button
              onClick={() => {
                deleteTodos({
                  variables: {
                    where: {
                      done: {
                        _eq: true,
                      },
                    },
                  },
                });
              }}
            >
              Clear completed
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="todo-container">
        <div>
          <TodosForm />
        </div>
        <div className="todos-container">{renderTodos()}</div>
      </div>
    </div>
  );
}
