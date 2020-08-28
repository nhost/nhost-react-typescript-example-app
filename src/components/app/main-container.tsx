import React from "react";
import { Header } from "components/app/header";

export interface IMainContainerProps {
  children: React.ReactNode;
}

export function MainContainer(props: IMainContainerProps) {
  const { children } = props;
  return (
    <div className="grid">
      <div className="main-container">
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}
