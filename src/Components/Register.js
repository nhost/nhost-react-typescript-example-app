import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import nhost from '../nhost';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  async onFormSubmit(e) {
    e.preventDefault();

    const {
      name,
      username,
      password,
    } = this.state;

    // optional variable
    const register_data = {
      name,
    };

    try {
      await nhost.register(username, password, register_data);
    } catch (e) {
      console.error(e);
      alert('Error, check error logs');
      return;
    }

    alert('user registration OK');
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
              placeholder="name"
              value={this.state.name}
              onChange={(e) => this.setState({name: e.target.value})}
            />
            <input
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}
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
