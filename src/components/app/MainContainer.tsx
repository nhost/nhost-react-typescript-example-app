import React, { ReactNode } from "react";
import styled from "styled-components";
import { Header } from "./Header";

const MainContainerContainer = styled.div`
  display: grid;
  grid-template-columns:
    [full-start] minmax(3rem, 1fr) [main-start] minmax(min-content, 60rem)
    [main-end] minmax(3rem, 1fr) [full-end];
  > .main-container {
    grid-column: main;
  }
`;

export interface IMainContainerProps {
  children: ReactNode;
}

export function MainContainer(props: IMainContainerProps) {
  return (
    <MainContainerContainer>
      <div className="main-container">
        <Header />
        <div>{props.children}</div>
      </div>
    </MainContainerContainer>
  );
}
