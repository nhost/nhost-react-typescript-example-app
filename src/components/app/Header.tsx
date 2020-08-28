import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
import { HeaderUser } from "./header-user";

export function Header() {
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
    <div>
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
    </div>
  );
}
