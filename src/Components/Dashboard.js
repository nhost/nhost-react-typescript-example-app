import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    return (
      <>
        Dashboard

        <Link to={`/other`}>other</Link>
      </>
    );
  }
}
export default Dashboard;
