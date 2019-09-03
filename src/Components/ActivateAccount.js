import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import nhost from '../nhost';

class ActivateAccount extends Component {

  constructor(props) {
    super(props);

    this.activateAccount = this.activateAccount.bind(this);

    this.activateAccount();
  }


  async activateAccount() {
    const { secret_token } = this.props.match.params;

    try {
      await nhost.activate_account(secret_token);
    } catch (e) {
      alert('error activating account');
      console.error(e);
      // return;
    }

    alert('account activated');

    this.props.history.push('/');
  }

  render() {
    return (
      <>
        Trying to activate account... <br />
        <br />
        Place secret_token as a query parameter like: /activate-account/xxx
      </>
    );
  }
}

export default withRouter(ActivateAccount);
