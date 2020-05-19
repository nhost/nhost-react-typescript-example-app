import * as React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../nhost";

export interface INavProps {}

export interface INavState {}

export default class Nav extends React.Component<INavProps, INavState> {
  public render() {
    return (
      <div>
        <div>
          <Link to={`/`}>Dashboard</Link>
          <Link to={`/todos`}>Todos</Link>
          <Link to={`/files`}>Files</Link>
          <span onClick={() => auth.logout()}>Logout</span>
        </div>
      </div>
    );
  }
}
