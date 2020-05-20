import React, { useState } from "react";
import { useSubscription, useMutation } from "@apollo/react-hooks";
import styled from "styled-components";

import { S_GET_TODOS, UPDATE_TODO, DELETE_TODOS } from "./gql/Todos";
import { s_getTodos, s_getTodosVariables } from "../../generated/s_getTodos";
import { TodosForm } from "./TodosForm";
import { IconButton, Button } from "@material-ui/core";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { getTodos_todos } from "../../generated/getTodos";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";

const DIV_TODOS = styled.div`
  .todo-container {
    margin-top: 3rem;
  }
  .todos-container {
  }
  .todo-item-container {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #c8c8c8;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    .filter-buttons {
      > * {
        margin: 0 0.3rem;
      }
    }
  }
`;

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
                <IconButton
                  onClick={() => {
                    toggleTodoItem(todo);
                  }}
                >
                  {todo.done ? (
                    <CheckCircleOutlineIcon />
                  ) : (
                    <RadioButtonUncheckedIcon />
                  )}
                </IconButton>
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
    <MainContainer>
      <DIV_TODOS>
        <Header />
        <div className="todo-container">
          <div>
            <TodosForm />
          </div>
          <div className="todos-container">{renderTodos()}</div>
        </div>
      </DIV_TODOS>
    </MainContainer>
  );
}
