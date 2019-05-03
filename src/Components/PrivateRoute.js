import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import nhost from '../nhost';
import auth from '../auth';

class PrivateRoute extends Component {

  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <Route
        {...this.props}
        render={props => {
          if (!auth.isAuthenticated()) {
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
