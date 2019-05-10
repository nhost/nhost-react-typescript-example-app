import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import nhost from '../nhost';

class Dashboard extends Component {
  render() {
    return (
      <>
        Dashboard

        <Link to={`/other`}>other</Link>

        <span onClick={() => {
          nhost.logout();
          this.props.history.push('/login');
        }}>
          Log out
        </span>
      </>
    );
  }
}

export default withRouter(Dashboard);
