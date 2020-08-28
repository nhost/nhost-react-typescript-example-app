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
    "block mr-3 pb-4 text-gray-600 transition easy-in-out duration-200": true,
    "border-b-2 border-indigo-600 text-gray-900": dashboard_match,
  });

  const todo_classes = classNames({
    "block mx-3 pb-4 text-gray-600 transition easy-in-out duration-200": true,
    "border-b-2 border-indigo-600 text-gray-900": todo_match,
  });

  const files_classes = classNames({
    "block mx-3 pb-4 text-gray-600 transition easy-in-out duration-200": true,
    "border-b-2 border-indigo-800": files_match,
  });

  const settings_classes = classNames({
    "block mx-3 pb-4 text-gray-600 transition easy-in-out duration-200": true,
    "border-b-2 border-indigo-800": settings_match,
  });

  return (
    <div>
      <div className="container mx-auto" style={{ height: "64px" }}>
        <HeaderUser />
      </div>

      <div className="border-b border-gray-300">
        <div className="flex container mx-auto">
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
    </div>
  );
}
