import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withApollo, Subscription } from 'react-apollo';
import Header from './Header';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { auth } from '../nhost';

import {
  S_GET_TODOS,
  INSERT_TODO,
  UPDATE_TODO,
  CLEAR_COMPLETED,
} from './gql/Todos';

const S = {};
S.Dashboard = styled.div`
{

  display: grid;
  grid-template-columns: [full-start] minmax(3rem, 1fr) [main-start] minmax(min-content, 60rem) [main-end] minmax(3rem, 1fr) [full-end];

  > .main-container {
    grid-column: main;
  }

  .todo-container {
    margin-top: 3rem;
  }

  .todos-container {

  }

  .todo-item-container {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid #c8c8c8;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    .filter-buttons {
      > * {
        margin: 0 0.3rem;
      }
    }
  }
}
`;

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      todo: '',
      filter: 'all',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTodoItem = this.toggleTodoItem.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { todo } = this.state;

    this.setState({
      todo: '',
    });

    const options = {
      mutation: INSERT_TODO,
      variables: {
        todo: {
          todo,
        },
      },
    };

    this.props.client.mutate(options);
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

  clearCompleted() {
    const options = {
      mutation: CLEAR_COMPLETED,
    };

    this.props.client.mutate(options);
  }

  renderCheckButton(item) {
    if (item.done) {
      return <CheckCircleOutlineIcon />;
    }

    return <RadioButtonUncheckedIcon  />;
  }

  render() {
    return (
      <S.Dashboard>
        <div className="main-container">

          <div>
            <Header />
          </div>

          <div className="todo-container">

            <div>
              <form
                onSubmit={this.handleSubmit}
              >
                <TextField
                  autoFocus
                  variant="outlined"
                  required
                  fullWidth
                  id="todo"
                  label="Todo"
                  placeholder="What needs to be done?"
                  onChange={e => this.setState({todo: e.target.value})}
                  value={this.state.todo}
                />
              </form>
            </div>
            <Subscription
              subscription={S_GET_TODOS}
            >
              {({ loading, error, data }) => {

                if (loading) return 'Loading...';
                if (error) {
                  console.log({error});
                  return `Error! ${error.message}`;
                }

                const { todos } = data;

                let todos_left = 0;
                todos.forEach(todo => {
                  if (!todo.done) todos_left++;
                });

                // filter todos
                let todos_filtered = null;
                if (this.state.filter === 'all') {
                  todos_filtered = todos;
                } else if (this.state.filter === 'active') {
                  todos_filtered = todos.filter(todo => {
                    return todo.done === false;
                  });
                } else if (this.state.filter === 'completed') {
                  todos_filtered = todos.filter(todo => {
                    return todo.done === true;
                  });
                }

                return (
                  <div className="todos-container">
                    <div>
                      {todos_filtered.map(item => {
                        return (
                          <div
                            key={item.id}
                            className="todo-item-container"
                          >
                            <div
                              className="todo-check"
                            >
                              <IconButton
                                onClick={() => {
                                  this.toggleTodoItem(item);
                                }}
                              >
                                {this.renderCheckButton(item)}
                              </IconButton>
                            </div>
                            <div className="todo-item">
                              {item.todo}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="bottom">
                      <div className="items-left">
                        {todos_left} items left
                      </div>
                      <div className="filter-buttons">
                        <Button
                          onClick={() => {
                            this.setState({
                              filter: 'all',
                            });
                          }}
                        >
                          All
                        </Button>
                        <Button
                          onClick={() => {
                            this.setState({
                              filter: 'active',
                            });
                          }}
                        >
                          Active
                        </Button>
                        <Button
                          onClick={() => {
                            this.setState({
                              filter: 'completed',
                            });
                          }}
                        >
                          Completed
                        </Button>
                      </div>
                      <div className="">
                        <Button
                          onClick={this.clearCompleted}
                        >
                          Clear completed
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Subscription>
          </div>
        </div>
      </S.Dashboard>
    );
  }
}

export default withApollo(withRouter(Dashboard));
