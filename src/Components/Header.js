import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter, matchPath } from 'react-router-dom';
import classNames from 'classnames';
import { auth }  from '../nhost';

const S = {};
S.Header = styled.div`
{
  display: flex;
  justify-content: space-around;
  padding: 2rem 0;
  border-bottom: 1px solid #ccc6c6;

  .menu-item {
    color: rgb(69, 69, 69);
    padding: 1rem 3rem;
    cursor: pointer;
    transition-duration: 300ms;
    border-radius: 4px;
    text-transform: uppercase;

    &:hover {
      background: #ddd;
    }
  }

  .active {
    background: #1f89f0;
    color: #fff;

    &:hover {
      background: #1171cd;
    }
  }
}
`;

class Header extends Component {
  render() {

    const todo_match = matchPath(this.props.location.pathname, {
      path: '/',
      exact: true,
      strict: false,
    });

    const files_match = matchPath(this.props.location.pathname, {
      path: '/files',
      exact: false,
    });

    const todo_classes = classNames({
      'menu-item': true,
      'active': todo_match,
    });

    const files_classes = classNames({
      'menu-item': true,
      'active': files_match,
    });

    return (
      <S.Header>

        <Link
          to={`/`}
          className={todo_classes}
        >
          Todo
        </Link>

        <Link
          to={`/files`}
          className={files_classes}
        >
          Files
        </Link>


        <span
          onClick={() => {
            auth.logout();
            this.props.history.push('/');
          }}
          className="menu-item"
        >
          Log out
        </span>

        <span
          onClick={() => {
            auth.logout(true);
            this.props.history.push('/');
          }}
          className="menu-item"
        >
          Log out all sessions
        </span>

      </S.Header>
    );
  }
}
export default withRouter(Header);
