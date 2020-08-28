import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNowStrict } from "date-fns";
import { useMutation, useSubscription } from "@apollo/client";
import { INSERT_FILE, S_GET_FILES, DELETE_FILES } from "gql/files";
import { s_getFiles, s_getFilesVariables } from "generated/s_getFiles";
import { storage } from "utils/nhost";
import { BACKEND_ENDPOINT } from "utils/config";
import { Button } from "components/ui";

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
    return <div className="text-gray-500 text-center pt-8">Loading...</div>;
  }

  if (!data || data.files.length === 0) {
    return <div className="text-gray-500 text-center pt-8">No files.</div>;
  }

  const { files } = data;

  return (
    <table className="w-full">
      <thead className="font-bold">
        <tr>
          <td>Name</td>
          <td>Created</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => {
          return (
            <tr key={file.id} className="odd:bg-gray-200">
              <td className="py-3">
                <a
                  className="pl-4 hover:text-indigo-600"
                  href={file.downloadable_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.file_path}
                </a>
              </td>
              <td>
                {formatDistanceToNowStrict(new Date(file.created_at), {
                  addSuffix: true,
                })}
              </td>
              <td>
                <button
                  className="py-1 px-4 border rounded"
                  onClick={async () => {
                    const metadata = await storage.getMetadata(file.file_path);
                    console.log({ metadata });
                    alert("check logs for metadta ");
                  }}
                >
                  meta
                </button>
              </td>
              <td>
                <button
                  className="py-1 px-4 border rounded"
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
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export interface IFilesProps {}

export function Files(props: IFilesProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileData, setFileData] = useState<File | null>();
  const [uploadState, setUploadState] = useState("");
  const [uploadCompleted, setUploadCompleted] = useState(0);

  console.log("inside files component");

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

    const downloadable_url = `${BACKEND_ENDPOINT}/storage/o${file_path}`;
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
    <div className="max-w-4xl mx-auto py-6">
      <div className="max-w-xl mx-auto">
        <div className="py-6">
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
            </div>
          </form>
        </div>
        <div className="py-6">
          <Button
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

        {uploadState === "UPLOADING" && (
          <div className="uploading-progress">
            {uploadCompleted} %
            {/* <LinearProgress variant="determinate" value={uploadCompleted} /> */}
          </div>
        )}
      </div>
      <div className="mt-8">
        <FilesList />
      </div>
    </div>
  );
}
