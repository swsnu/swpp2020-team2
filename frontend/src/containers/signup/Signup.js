import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class Signup extends Component {
  state={
    username: '',
    password: '',
    pwConfirm: '',
    university: 'Seoul National University',
    department: '',
    email: '',
    firstName: '',
    lastName: '',
  }

  signupHandler=() => {
    this.props.signup({
      id: this.state.username,
      password: this.state.password,
      university: this.state.university,
      department: this.state.department,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    });
  }

  render() {
    return (
      <div className="Signup">
        <h1>Sign Up</h1>
        ID:
        <input
          id="username-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ username: event.target.value })}
        />
        <br />
        Password:
        <input
          id="password-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ password: event.target.value })}
        />
        <br />
        Confirm Password:
        <input
          id="pwConfirm-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ pwConfirm: event.target.value })}
        />
        <br />
        University:
        <select onChange={(event) => this.setState({ university: event.target.value })}>
          <option value="Seoul National University">Seoul National University</option>
        </select>
        <br />
        Department:
        <select onChange={(event) => this.setState({ department: event.target.value })}>
          <option value="CSE">Computer Science and Engineering</option>
          <option value="ECE">Electrical and Computer Engineering</option>
        </select>
        <br />
        Email:
        <input
          id="email-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ email: event.target.value })}
        />
        <br />
        First Name:
        <input
          id="firstName-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ firstName: event.target.value })}
        />
        <br />
        Last Name:
        <input
          id="lastName-input"
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ lastName: event.target.value })}
        />
        <div><button type="button" id="signup-button" onClick={() => this.signupHandler()}>sign up</button></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (args) => dispatch(actionCreators.signUp(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
