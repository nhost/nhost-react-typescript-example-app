import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import nhost from '../nhost';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();

    const {
      username,
      password,
    } = this.state;

    try {
      await nhost.login(username, password);
    } catch (e) {
      alert('error logging in');
      console.error(e);
      return;
    }

    this.props.history.push('/');
  }

  render() {
    return (
      <>
        <h1>Login</h1>
        <div>
          <form
            onSubmit={this.onFormSubmit}
          >
            <input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}
              autoFocus
            />
            <input
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
            <button
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link>.
        </div>
      </>
    );
  }
}

export default withRouter(Login);
