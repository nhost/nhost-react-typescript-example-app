import React from "react";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";
import styled from "styled-components";

const DashboardContainer = styled.div`
  margin-top: 3rem;
`;

export interface IDashboardProps {}

export function Dashboard(props: IDashboardProps) {
  return (
    <DashboardContainer>
      Welcome to Nhost's example app in React
    </DashboardContainer>
  );
}
