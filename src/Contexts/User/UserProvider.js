import React, { Component } from 'react';
import { auth } from '../../nhost';
// import jwt from 'jsonwebtoken';
import { UserContext, defaultUserContext } from './UserContext';

class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = defaultUserContext;
  }

  componentDidMount() {
    auth.onAuthStateChanged(data => {

      if (!data) {
        this.setState({
          auth_status_reported: true,
          signed_in: false,
        });
        return;
      }

      // const {
      //   jwt_token,
      // } = data;
      // sett claims as session variable in sessionStorage if needed
      // var claims = jwt.decode(jwt_token);
      // sessionStorage.setItem('company_id', claims['https://hasura.io/jwt/claims']['x-hasura-company-id']);

      this.setState({
        auth_status_reported: true,
        signed_in: true,
      });
    });
  }

  render() {
    const { auth_status_reported, signed_in } = this.state;

    return (
      <UserContext.Provider
        value={{
          auth_status_reported,
          signed_in,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserContextProvider;
