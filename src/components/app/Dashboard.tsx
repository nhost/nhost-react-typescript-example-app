import * as React from "react";
import Nav from "./Nav";

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
        <Nav />
        Dashboard
      </div>
    );
  }
}
