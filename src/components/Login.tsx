import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../nhost";

const S_LOGIN = styled.div``;

interface LoginState {
  email: string;
  password: string;
  mfa_ticket: string;
  mfa_code: string;
}

class Login extends Component<any, LoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: "elitasson@gmail.com",
      password: "hejsan",
      mfa_ticket: "",
      mfa_code: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleMFALogin = this.handleMFALogin.bind(this);
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("handle submit plzd");

    console.log(this.state);

    const { email, password } = this.state;

    let login_res;
    try {
      login_res = await auth.login(email, password);
    } catch (error) {
      console.error("error logging in");
      console.error(error);
      return;
    }

    console.log({ login_res });

    // if ("mfa" in login_res && login_res.mfa) {
    //   return this.setState({
    //     mfa_ticket: login_res.ticket,
    //   });
    // }

    console.log("login OK");
    this.props.history.push("/");
  }

  // async handleMFALogin(e) {
  //   e.preventDefault();

  //   const { mfa_ticket, mfa_code } = this.state;

  //   try {
  //     await auth.totp(mfa_ticket, mfa_code);
  //   } catch (error) {
  //     alert("unable to MFA login");
  //   }
  //   console.log("login OK");
  //   this.props.history.push("/");
  // }

  // loginAnonymously() {
  //   auth.loginAnonymously();
  // }

  renderLogin() {
    const { email, password, mfa_ticket } = this.state;
    if (mfa_ticket) return;
    return (
      <div>
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
            <button>Login</button>
          </form>
        </div>
        {/* <div>
          <button onClick={this.loginAnonymously}>Login Anonymously</button>
        </div> */}
        <div>
          <a href={`http://localhost:3000/auth/providers/github`}>
            Login with Github
          </a>
        </div>
      </div>
    );
  }

  // renderMFALogin() {
  //   const { mfa_ticket, mfa_code } = this.state;

  //   if (!mfa_ticket) return;

  //   return (
  //     <div>
  //       <form onSubmit={this.handleMFALogin}>
  //         <input
  //           type="text"
  //           value={mfa_code}
  //           onChange={(e) => this.setState({ mfa_code: e.target.value })}
  //         />
  //         <button>mfa login</button>
  //       </form>
  //     </div>
  //   );
  // }

  render() {
    console.log(this.state);

    return (
      <S_LOGIN>
        <div>
          <div>Login</div>
          {this.renderLogin()}
          {/* {this.renderMFALogin()} */}
        </div>
      </S_LOGIN>
    );
  }
}

export default withRouter(Login);
