import * as React from "react";
import { auth } from "../nhost";

export interface IDashboardProps {}

export interface IDashboardState {}

export default class Dashboard extends React.Component<
  IDashboardProps,
  IDashboardState
> {
  constructor(props: IDashboardProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        Dashboard
        <div>
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      </div>
    );
  }
}
