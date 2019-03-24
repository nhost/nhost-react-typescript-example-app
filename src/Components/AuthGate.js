import React, { Component } from 'react';
import hbp from '../hbp';

class AuthGate extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}
export default AuthGate;
