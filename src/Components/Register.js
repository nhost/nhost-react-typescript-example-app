import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import nhost from '../nhost';

class Register extends Component {

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
      await nhost.register(username, password);
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <h1>Register</h1>
        <div>
          <form
            onSubmit={this.onFormSubmit}
          >
            <input
              type="text"
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}
            />
            <input
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
            <button
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
        <div>
          Already have an account? <Link to="/login">Login</Link>.
        </div>
      </>
    );
  }
}

export default Register;
