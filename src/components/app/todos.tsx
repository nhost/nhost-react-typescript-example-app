import React, { useState } from "react";
import { useSubscription, useMutation } from "@apollo/client";
import classNames from "classnames";

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
      return <div className="text-gray-500 text-center pt-8">Loading...</div>;
    }

    if (!data || data.todos.length === 0) {
      return (
        <div className="text-gray-500 text-center pt-8">
          No todos. Create one!
        </div>
      );
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

    const buttonFilterAll = classNames([
      "py-1 px-2 mx-3 outline-none",
      {
        border: filter === "all",
      },
    ]);

    const buttonFilterActive = classNames([
      "py-1 px-2 mx-3 outline-none",
      {
        border: filter === "active",
      },
    ]);

    const buttonFilterCompleted = classNames([
      "py-1 px-2 mx-3 outline-none",
      {
        border: filter === "completed",
      },
    ]);

    return (
      <div className="pt-3">
        {todos_filtered.map((todo) => {
          const checkboxClasses = classNames([
            "flex items-center justify-center",
            "w-6",
            "h-6",
            "rounded-full",
            "border",
            "cursor-pointer",
            "hover:shadow-lg",
            "transition easy-in-out duration-150",
            {
              "text-teal-400": todo.done,
              "border-teal-400": todo.done,
            },
          ]);

          const textClasses = classNames([
            "pl-4",
            "transition easy-in-out duration-150",
            {
              "text-gray-600": todo.done,
              "line-through": todo.done,
            },
          ]);

          return (
            <div key={todo.id} className="flex items-center py-3">
              <div
                className={checkboxClasses}
                onClick={() => {
                  toggleTodoItem(todo);
                }}
              >
                {todo.done && (
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="check w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              {/* {todo.done ? <span>done</span> : <span>not done</span>} */}
              <div className={textClasses}>{todo.todo}</div>
            </div>
          );
        })}

        <div className="flex justify-between items-center border-t border-gray-300 pt-3 text-sm text-gray-600">
          <div className="">{todos_left} items left</div>
          <div className="filter-buttons">
            <button
              className={buttonFilterAll}
              onClick={() => {
                setFilter("all");
              }}
            >
              All
            </button>
            <button
              className={buttonFilterActive}
              onClick={() => {
                setFilter("active");
              }}
            >
              Active
            </button>
            <button
              className={buttonFilterCompleted}
              onClick={() => {
                setFilter("completed");
              }}
            >
              Completed
            </button>
          </div>
          <div className="">
            <button
              className="rounded p-3 hover:bg-gray-200"
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
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 max-w-xl mx-auto">
      <TodosForm />
      {renderTodos()}
    </div>
  );
}
