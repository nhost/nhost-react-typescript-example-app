import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo, Subscription } from 'react-apollo';
import nhost from '../nhost';

import {
  S_GET_TODOS,
  INSERT_TODO,
  UPDATE_TODO,
} from './gql/Todos';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todo_input: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const options = {
      mutation: INSERT_TODO,
      variables: {
        todo: {
          todo: this.state.todo_input,
        },
      },
    };

    this.props.client.mutate(options);

    this.setState({
      todo_input: '',
    });
  }

  toggleTodoItem(todo) {

    const options = {
      mutation: UPDATE_TODO,
      variables: {
        id: todo.id,
        todo: {
          done: !todo.done,
        },
      },
    };

    this.props.client.mutate(options);
  }

  render() {
    return (
      <>
        <div>

          <Link to={`/other`}>other</Link>

          <span onClick={() => {
            nhost.logout();
            this.props.history.push('/login');
          }}>
            Log out
          </span>

        </div>
        <div>
          <div>
            <form
              onSubmit={this.handleSubmit}
            >
              <input
                type="text"
                onChange={e => this.setState({todo_input: e.target.value})}
                value={this.state.todo_input}
              />
              <input
                type="submit"
                value="add todo"
              />
            </form>
          </div>
          <Subscription
            subscription={S_GET_TODOS}
          >
            {({ loading, error, data }) => {

              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              return (
                <ul>
                  {data.todos.map(item => {
                    return (
                      <li
                        key={item.id}
                        onClick={() => {
                          this.toggleTodoItem(item);
                        }}
                      >
                        {item.done && <s>{item.todo}</s>}
                        {!item.done && <>{item.todo}</>}
                      </li>
                    );
                  })}
                </ul>
              );
            }}
          </Subscription>
        </div>
      </>
    );
  }
}

export default withApollo(withRouter(Dashboard));
