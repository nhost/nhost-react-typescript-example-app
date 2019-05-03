import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import nhost from '../nhost';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      password_confirm: '',
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();

    const {
      password,
      password_confirm,
    } = this.state;

    if (password === '' || password !== password_confirm) {
      alert('Passwords are not same');
      return;
    }

    const { secret_token } = this.props.match.params;

    try {
      await nhost.new_password(secret_token, password);
    } catch (e) {
      alert('error setting new password');
      console.error(e.data.message);
      return;
    }

    this.props.history.push('/login');
  }

  render() {
    return (
      <>
        <h1>New Password</h1>
        <div>
          <form
            onSubmit={this.onFormSubmit}
          >
            <input
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
            <input
              type="password"
              value={this.state.password_confirm}
              onChange={(e) => this.setState({password_confirm: e.target.value})}
            />
            <button
              type="submit"
            >
              Set new password
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

export default withRouter(Login);
