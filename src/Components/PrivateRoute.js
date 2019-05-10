import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import nhost from '../nhost';

class PrivateRoute extends Component {

  constructor(props) {
    super(props);

    console.log(props);
  }

  async isAuthenticated() {
    return await nhost.isAuthenticated();
  }

  render() {
    return (
      <Route
        {...this.props}
        render={props => {
          if (!this.isAuthenticated()) {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }

          return this.props.render();

        }}
      />
    );
  }
}

export default PrivateRoute;
