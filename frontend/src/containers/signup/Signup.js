import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class Signup extends Component {
  state={
    username: '',
    password: '',
    pwConfirm: '',
    university: '',
    department: '',
    email: '',
    firstName: '',
    lastName: '',
  }

  componentDidUpdate(prevProps) {
    if (this.props.signinedUser !== prevProps.signinedUser) {
      if (this.props.signinedUser) this.props.history.replace('/public');
    }
  }

  signupHandler=() => {
    if (this.state.username === '' || this.state.password === '' || this.state.pwConfirm === '' || this.state.university === '' || this.state.department === '' || this.state.email === '' || this.state.firstName === '' || this.state.lastName === '') {
      alert('All fields must be filled.');
      return;
    }
    let len = this.state.username.length;
    for (var i = 0; i < len; ++i) {
      var ch = this.state.username[i];
      if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || (ch >= '0' && ch <= '9') || ch === '_')) break;
    }
    if (i < len) {
      alert('ID can only contain alphabet, number or underscore.');
      return;
    }
    if (this.state.password !== this.state.pwConfirm) {
      alert('Confirmed password is not the same as password.');
      return;
    }
    if (this.state.email.length < 10 || this.state.email.substr(this.state.email.length - 10, 10) !== '@snu.ac.kr') {
      alert('Email does not match with university.');
      return;
    }
    len = this.state.firstName.length;
    for (i = 0; i < len; ++i) {
      ch = this.state.firstName[i];
      if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))) break;
    }
    if (i < len) {
      alert('Name can only contain alphabet.');
      return;
    }
    len = this.state.lastName.length;
    for (i = 0; i < len; ++i) {
      ch = this.state.lastName[i];
      if (!((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'))) break;
    }
    if (i < len) {
      alert('Name can only contain alphabet.');
      return;
    }
    this.props.signup({
      username: this.state.username,
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
        <select id="university-input" onChange={(event) => this.setState({ university: event.target.value })}>
          <option value="">--choose your university--</option>
          <option value="Seoul National University">Seoul National University</option>
        </select>
        <br />
        Department:
        <select id="department-input" onChange={(event) => this.setState({ department: event.target.value })}>
          <option value="">--choose your department--</option>
          <option value="Computer Science and Engineering">Computer Science and Engineering</option>
          <option value="Electrical and Computer Engineering">Electrical and Computer Engineering</option>
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
