import React, { Component } from 'react';
import styled from 'styled-components';
import { withApollo, Subscription } from 'react-apollo';
import Header from './Header';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { storage } from '../nhost';
import { BACKEND_ENDPOINT } from '../config';
import {
  S_GET_FILES,
  INSERT_FILE,
  DELETE_FILE,
 } from './gql/Files';

const S = {};
S.Files = styled.div`
{
  display: grid;
  grid-template-columns: [full-start] minmax(3rem, 1fr) [main-start] minmax(min-content, 60rem) [main-end] minmax(3rem, 1fr) [full-end];

  > .main-container {
    grid-column: main;

    .files {

      .file {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #ccc6c6;
      }
    }

    .input-file-container {
      padding: 3rem 0;
      border-bottom: 1px solid #ccc6c6;
    }
  }

}
`;

class Files extends Component {

  constructor(props) {
    super(props);

    this.state = {
      upload_state: 'READY',
      upload_completed: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.file_input = React.createRef();
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({
      upload_state: 'UPLOADING',
      upload_completed: 0,
    });

    const file = this.file_input.current.files[0];

    const metadata = {
      custom: 'data',
    };

    const onUploadProgress = (data) => {
      const upload_completed = Math.round((data.loaded / data.total) * 100);
      console.log({upload_completed});
      console.log(this.state.upload_state);
      this.setState({
        upload_completed,
      });
    };

    const uploaded_file = await storage.put(`/public/${file.name}`, file, metadata, onUploadProgress);

    // console.log({uploaded_file})

    // get file_path and generate downloadable_url
    const { key, token } = uploaded_file;
    const file_path = key;
    const downloadable_url = `${BACKEND_ENDPOINT}/storage/file/${key}?token=${token}`;

    // insert the file info in the database
    const options = {
      mutation: INSERT_FILE,
      variables: {
        file: {
          file_path,
          downloadable_url,
        },
      },
    };

    this.props.client.mutate(options);

    this.setState({
      upload_state: 'READY',
    });

  }

  render() {
    return (
      <S.Files>
        <div className="main-container">

          <div>
            <Header />
          </div>

          <div>

            <div className="input-file-container">
              <div>

                <form onSubmit={this.handleSubmit}>
                  <input type="file" ref={this.file_input} />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleSubmit}
                    disabled={this.state.upload_state === 'UPLOADING'}
                  >
                    Upload
                  </Button>
                </form>

              </div>

              {this.state.upload_state === 'UPLOADING' &&
                <div>
                  <LinearProgress variant="determinate" value={this.state.upload_completed} />
                </div>
              }
            </div>

            <div>
              <Subscription
                subscription={S_GET_FILES}
              >
                {({ loading, error, data }) => {

                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;

                  const { files } = data;

                  return (

                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {files.map(file => {
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
                                  onClick={async () => {
                                      // get downloadable link async
                                      // this function respects storage rules
                                    const downloadable_url = await storage.getDownloadURL(file.file_path);
                                    alert(downloadable_url);
                                  }}
                                >
                                  Download Link
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  onClick={() => {

                                      // delete actual file
                                    storage.delete(file.file_path);

                                      // delete file entry in database
                                    const options = {
                                      mutation: DELETE_FILE,
                                      variables: {
                                        id: file.id,
                                      },
                                    };

                                    this.props.client.mutate(options);
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
                }}
              </Subscription>
            </div>

          </div>
        </div>

      </S.Files>
    );
  }
}
export default withApollo(Files);
