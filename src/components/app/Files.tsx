import React, { useState, useRef } from "react";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";
import styled from "styled-components";
import {
  LinearProgress,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import { storage } from "../../nhost";
import { useMutation, useSubscription } from "@apollo/react-hooks";
import { INSERT_FILE, S_GET_FILES, DELETE_FILES } from "./gql/Files";
import { s_getFiles, s_getFilesVariables } from "../../generated/s_getFiles";
import * as config from "../../config";

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

  const { loading, data } = useSubscription<s_getFiles, s_getFilesVariables>(
    S_GET_FILES,
    {
      variables: { limit: 40 },
    }
  );

  const [
    insertFile,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(INSERT_FILE);
  const [
    deleteFile,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_FILES);

  const handleSubmit = async () => {
    if (!fileData || !fileInput.current) {
      return console.log("No file selected");
    }

    setUploadState("UPLOADING");
    const file_path = "/public/test.png";
    const file_res = await storage.put(file_path, fileData, null, (d: any) => {
      setUploadCompleted((d.loaded / d.total) * 100);
    });
    setUploadState("");
    fileInput.current.value = "";

    console.log({ file_res });

    const downloadable_url = `${config.BACKEND_ENDPOINT}/storage/o${file_path}`;
    await insertFile({
      variables: {
        file: {
          file_path,
          downloadable_url,
        },
      },
    });
  };

  const renderFiles = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!data || !data.files) {
      return <div>No files.</div>;
    }

    const { files } = data;

    return files.map((file) => {
      return (
        <TableRow key={file.id}>
          <TableCell component="th" scope="row">
            <a
              href={file.downloadable_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {file.file_path}
            </a>
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                console.log("remove file");

                storage.delete(file.file_path);
                deleteFile({
                  variables: {
                    where: {
                      id: {
                        _eq: file.id,
                      },
                    },
                  },
                });
              }}
            >
              Remove
            </Button>
          </TableCell>
        </TableRow>
      );
    });

    // return ()
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
        <div>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow></TableRow>
            </TableHead>
            <TableBody>{renderFiles()}</TableBody>
          </Table>
        </div>
      </FilesContainer>
    </MainContainer>
  );
}
