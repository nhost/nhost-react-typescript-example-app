import React, { useState, useRef } from "react";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";
import styled from "styled-components";
import { LinearProgress, Button } from "@material-ui/core";
import { storage } from "../../nhost";

const FilesContainer = styled.div`
  margin-top: 3rem;

  .file {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc6c6;
  }

  .input-file-container {
    padding: 3rem 0;
    border-bottom: 1px solid #ccc6c6;
  }
`;

export interface IFilesProps {}

export function Files(props: IFilesProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<File | null>();
  const [uploadState, setUploadState] = useState("");
  const [uploadCompleted, setUploadCompleted] = useState(0);

  const handleSubmit = async () => {
    if (!fileData || !fileInput.current) {
      return console.log("No file selected");
    }

    setUploadState("UPLOADING");
    const file_res = await storage.put(
      "/public/test.png",
      fileData,
      null,
      (d: any) => {
        setUploadCompleted((d.loaded / d.total) * 100);
      }
    );
    setUploadState("");
    fileInput.current.value = "";

    console.log({ file_res });
  };

  return (
    <MainContainer>
      <Header />
      <FilesContainer>
        <div className="input-file-container">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <input
                type="file"
                onChange={(e) => {
                  if (!e.target.files?.length) return;
                  setFileData(e.target.files[0]);
                }}
                ref={fileInput}
              />
              <Button
                color="primary"
                variant="contained"
                disabled={uploadState === "UPLOADING"}
                type="submit"
              >
                Upload
              </Button>
            </form>
          </div>

          {uploadState === "UPLOADING" && (
            <div className="uploading-progress">
              {uploadCompleted} %
              <LinearProgress variant="determinate" value={uploadCompleted} />
            </div>
          )}
        </div>
        Files
      </FilesContainer>
    </MainContainer>
  );
}
