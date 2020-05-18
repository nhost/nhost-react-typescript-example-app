import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../nhost";

const S_REGISTER = styled.div``;

interface RegisterState {
  email: string;
  password: string;
}

class Register extends Component<any, RegisterState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "elitasson@gmail.com",
      password: "hejsan",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("handle submit plzd");

    console.log(this.state);

    const { email, password } = this.state;

    try {
      await auth.register(email, password);
    } catch (error) {
      console.error("error register in");
      console.error(error);
      return;
    }

    this.props.history.push("/login");
  }

  render() {
    const { email, password } = this.state;

    return (
      <S_REGISTER>
        <div>
          <div>Register</div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                autoFocus
                placeholder="email"
                value={email}
                onChange={(e) => {
                  this.setState({
                    email: e.target.value,
                  });
                }}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  this.setState({
                    password: e.target.value,
                  });
                }}
              />
              <button>Register</button>
            </form>
          </div>
        </div>
      </S_REGISTER>
    );
  }
}

export default withRouter(Register);
