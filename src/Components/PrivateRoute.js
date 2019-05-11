import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import nhost from '../nhost';

class PrivateRoute extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <Route
        {...this.props}
        render={props => {

          if (!nhost.isAuthenticated()) {
            return (
              <Login />
            );
          }

          return this.props.render();

        }}
      />
    );
  }
}

export default PrivateRoute;
