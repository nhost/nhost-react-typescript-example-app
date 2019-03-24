import React, { Component } from 'react';
import hbp from '../hbp';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }


  async onFormSubmit(e) {
    e.preventDefault();

    const {
      username,
      password
    } = this.state;

    let res;
    try {
      res = await hbp.register(username, password);
    } catch (e) {
      console.log('in react app')
      console.log(e.data.message)
    }

    console.log('res')
    console.log(res);
  }

  render() {
    return (
      <>
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
        Register
      </>
    );
  }
}
export default Register;
