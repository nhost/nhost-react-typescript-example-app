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
    console.log('yes?');

    console.log(this.props);

    try {
      await nhost.activate_account(this.props.match.params.secret_token);
    } catch (e) {
      alert('error activating account');
      console.log(e.data.message);
      // return;
    }

    console.log('activation OK');

    // this.props.history.push('/login');
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
