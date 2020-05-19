import * as React from "react";
import Nav from "./Nav";

export interface IFilesProps {}

export interface IFilesState {}

export default class Files extends React.Component<IFilesProps, IFilesState> {
  constructor(props: IFilesProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <div>
        <Nav />
        <div>Files</div>
      </div>
    );
  }
}
