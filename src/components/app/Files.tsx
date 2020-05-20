import React, { useState } from "react";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";
import styled from "styled-components";

const FilesContainer = styled.div`
  .files-container {
    margin-top: 3rem;
  }
`;

export interface IFilesProps {}

export function Files(props: IFilesProps) {
  return (
    <MainContainer>
      <Header />
      <div className="files-container">Files</div>
    </MainContainer>
  );
}
