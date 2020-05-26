import React, { useState, useRef } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNowStrict } from "date-fns";
import DynamicFeedIcon from "@material-ui/icons/DynamicFeed";
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

    .input-file-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .icon {
    cursor: pointer;
  }
`;

export function FilesList() {
  const { loading, data } = useSubscription<s_getFiles, s_getFilesVariables>(
    S_GET_FILES,
    {
      variables: { limit: 40 },
    }
  );

  const [
    deleteFile,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_FILES);

  const [forceUpdateValue, forceUpdate] = React.useState(0);

  // rerender UI every 5 sec to update 'created at' column
  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(forceUpdateValue + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [forceUpdateValue]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.files.length === 0) {
    return <div>No files.</div>;
  }

  const { files } = data;

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Created</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {files.map((file) => {
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
                {formatDistanceToNowStrict(new Date(file.created_at), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell>
                <DynamicFeedIcon
                  className="icon"
                  onClick={async () => {
                    const metadata = await storage.getMetadata(file.file_path);
                    console.log({ metadata });
                    alert("check logs for metadta ");
                  }}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
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
        })}
      </TableBody>
    </Table>
  );
}

export interface IFilesProps {}

export function Files(props: IFilesProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<File | null>();
  const [uploadState, setUploadState] = useState("");
  const [uploadCompleted, setUploadCompleted] = useState(0);

  const [
    insertFile,
    // { loading: mutationLoading, error: mutationError },
  ] = useMutation(INSERT_FILE);

  const handleSubmit = async () => {
    if (!fileData || !fileInput.current) {
      // console.log("No file selected");
      return;
    }

    const uuid = uuidv4();
    const extension = fileData.name.split(".").pop();
    const file_path = `/public/${uuid}.${extension}`;

    await storage.put(file_path, fileData, null, (d: any) => {
      setUploadCompleted((d.loaded / d.total) * 100);
    });

    setUploadState("");
    fileInput.current.value = "";

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

  return (
    <FilesContainer>
      <div className="input-file-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="input-file-header">
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
            <Button
              color="primary"
              variant="contained"
              disabled={uploadState === "UPLOADING"}
              onClick={async () => {
                const metadata = await storage.getMetadata("/public/");
                console.log({ metadata });
                alert("check logs for metadta ");
              }}
            >
              Get /public/ metadata
            </Button>
          </div>
        </form>

        {uploadState === "UPLOADING" && (
          <div className="uploading-progress">
            {uploadCompleted} %
            <LinearProgress variant="determinate" value={uploadCompleted} />
          </div>
        )}
      </div>
      <div>
        <FilesList />
      </div>
    </FilesContainer>
  );
}
