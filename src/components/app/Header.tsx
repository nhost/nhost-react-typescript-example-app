import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
import { HeaderUser } from "./HeaderUser";

const HeaderContainer = styled.div`
  .user-container {
    padding: 1rem 2rem;
  }

  .menu-container {
    display: flex;
    justify-content: space-around;
    padding: 2rem 0;
    border-bottom: 1px solid #ccc6c6;
    .menu-item {
      color: rgb(69, 69, 69);
      padding: 1rem 3rem;
      cursor: pointer;
      transition-duration: 300ms;
      border-radius: 4px;
      text-transform: uppercase;
      &:hover {
        background: #ddd;
      }
    }
    .active {
      background: #1f89f0;
      color: #fff;
      &:hover {
        background: #1171cd;
      }
    }
  }
`;

export interface IHeaderProps {}

export function Header(props: IHeaderProps) {
  const dashboard_match = useRouteMatch({
    path: "/",
    exact: true,
    strict: false,
  });

  const todo_match = useRouteMatch({
    path: "/todos",
    exact: true,
    strict: false,
  });

  const files_match = useRouteMatch({
    path: "/files",
    exact: false,
  });

  const settings_match = useRouteMatch({
    path: "/settings",
    exact: false,
  });

  const dashboard_classes = classNames({
    "menu-item": true,
    active: dashboard_match,
  });

  const todo_classes = classNames({
    "menu-item": true,
    active: todo_match,
  });

  const files_classes = classNames({
    "menu-item": true,
    active: files_match,
  });

  const settings_classes = classNames({
    "menu-item": true,
    active: settings_match,
  });

  return (
    <HeaderContainer>
      <div className="user-container">
        <HeaderUser />
      </div>

      <div className="menu-container">
        <Link to={`/`} className={dashboard_classes}>
          Dashboard
        </Link>

        <Link to={`/todos`} className={todo_classes}>
          Todos
        </Link>

        <Link to={`/files`} className={files_classes}>
          Files
        </Link>

        <Link to={`/settings`} className={settings_classes}>
          Settings
        </Link>
      </div>
    </HeaderContainer>
  );
}
