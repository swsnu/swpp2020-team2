import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class Main extends Component {
  state={
    username: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signinedUser !== this.props.signinedUser) {
      if (this.props.signinedUser) this.props.history.replace('/public');
    }
  }

  signinHandler=() => {
    if (this.state.username === '' || this.state.password === '') {
      alert('please fill in ID and password.');
      return;
    }
    this.props.signin({ username: this.state.username, password: this.state.password });
  }

  render() {
    return (
      <div className="Main">
        <h1>Almanac</h1>
        <h2>Sign In</h2>
        ID:
        <input
          id="username-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        Password:
        <input
          id="password-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <div><button type="button" id="signin-button" onClick={() => this.signinHandler()}>sign in</button></div>
        or
        <span onClick={() => this.props.history.push('/signup')}> Sign Up</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
});

const mapDispatchToProps = (dispatch) => ({
  signin: (args) => dispatch(actionCreators.signIn(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
