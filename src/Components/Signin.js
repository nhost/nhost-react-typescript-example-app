import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import nhost from '../nhost';

const S = {};
S.Signin = styled.div`
{
  display: grid;
  grid-template-columns: [full-start] minmax(10px, 1fr) [main-start] minmax(min-content, 440px) [main-end] minmax(10px, 1fr) [full-end];

  .main-container {
    grid-column: main;
    padding-top: 4rem;
  }

  .top-center {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .signup-form-container {
    display: grid;
    grid-row-gap: 1rem;
  }

  .submit-button {
    display: flex;

    .loading {
      margin-right: 1rem;
    }
  }

  .error-container {
    margin-top: 1rem;
    background-color: #ffbdbf;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
  }

  .bottom-info {
    margin-top: 1rem;
  }
}
`;

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      error: false,
      error_msg: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  async onFormSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true,
      error: false,
      error_msg: '',
    });

    const {
      username,
      password,
    } = this.state;

    try {
      await nhost.login(username, password);
    } catch (e) {
      console.error(e);

      let error_msg = 'unknown error';
      try {
        error_msg = e.data.message;
      } catch (e) {
        //noop
      }

      this.setState({
        loading: false,
        error: true,
        error_msg,
      });
      return;
    }
  }

  render() {
    return (
      <S.Signin>
        <div className="main-container">
          <div className="top-center">
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <div className="top-center">
            <Typography component="h1" variant="h5">
              Nhost Example Sign In
            </Typography>
          </div>
          <form
            onSubmit={this.onFormSubmit}
          >
            <div className="signup-form-container">
              <TextField
                autoFocus
                autoComplete="email"
                type="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                onChange={e => this.setState({username: e.target.value})}
                value={this.state.username}
              />

              <TextField
                autoComplete="password"
                type="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                onChange={e => this.setState({password: e.target.value})}
                value={this.state.password}
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={this.state.loading}
                className="submit-button"
              >
                {this.state.loading &&
                  <CircularProgress className="loading" size={20} />
                }
                Sign in
              </Button>

            </div>
          </form>
          {this.state.error &&
            <div className="error-container">
              {this.state.error_msg}
            </div>
          }
          <div className="bottom-info">
            <Link to="/signup">Don't have an account? Sign Up!</Link>
          </div>
        </div>
      </S.Signin>
    );
  }
}

export default Signin;
