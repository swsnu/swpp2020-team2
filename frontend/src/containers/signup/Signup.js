import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import * as actionCreators from '../../store/actions/index';
import './Signup.css';
import { appLogo } from '../../images/index';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    pwConfirm: '',
    university: 1,
    department: 1,
    email: '',
    firstName: '',
    lastName: '',
    revealPassword: false,
    revealConfirmPassword: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.signinedUser !== prevProps.signinedUser) {
      if (this.props.signinedUser) this.props.history.replace('/public');
    }
  }

  signupHandler = () => {
    if (this.state.username === '' || this.state.password === '' || this.state.pwConfirm === '' || this.state.email === '' || this.state.firstName === '' || this.state.lastName === '') {
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
    /*
    if (this.state.email.length < 10 || this.state.email.substr(this.state.email.length - 10, 10) !== '@snu.ac.kr') {
      alert('Email does not match with university.');
      return;
    }
    */
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

  toggleRevealPassword=() => {
    this.setState((prevState) => ({ revealPassword: !prevState.revealPassword }));
  }

  toggleRevealConfirmPassword=() => {
    this.setState((prevState) => ({ revealConfirmPassword: !prevState.revealConfirmPassword }));
  }

  render() {
    return (
      <div className="SignUp">
        <div className="top">

          <button className="title" onClick={() => this.props.history.goBack()}>Almanac</button>
          <div className="description">A university events calendar</div>
        </div>

        <div className="container">

          <div className="logoBox">
            <img className="logo" alt="" src={appLogo} />
          </div>

          <div className="content">
            <h1>Sign Up</h1>

            <div className="signUpBox">
              <div className="box">
                <label className="label">ID</label>
                <input
                  id="username-input"
                  type="text"
                  value={this.state.title}
                  onChange={(event) => this.setState({ username: event.target.value })}
                />
              </div>

              <div className="box">

                <label className="label">Password</label>
                <div className="inputbox">
                  <input
                    id="password-input"
                    type={this.state.revealPassword ? 'text' : 'password'}
                    value={this.state.title}
                    onChange={(event) => this.setState({ password: event.target.value })}
                  />
                  <div className="toggle" onClick={this.toggleRevealPassword}>
                    {this.state.revealPassword
                      ? <FontAwesomeIcon icon={faEyeSlash} />
                      : <FontAwesomeIcon icon={faEye} />}
                  </div>
                </div>

              </div>

              <div className="box">

                <label className="label">Confirm Password</label>
                <div className="inputbox">
                  <input
                    id="pwConfirm-input"
                    type={this.state.revealConfirmPassword ? 'text' : 'password'}
                    value={this.state.title}
                    onChange={(event) => this.setState({ pwConfirm: event.target.value })}
                  />
                  <div className="toggle" onClick={this.toggleRevealConfirmPassword}>
                    {this.state.revealConfirmPassword
                      ? <FontAwesomeIcon icon={faEyeSlash} />
                      : <FontAwesomeIcon icon={faEye} />}
                  </div>
                </div>
              </div>

              <div className="box">

                <label className="label">University</label>
                <select id="university-input" onChange={(event) => this.setState({ university: event.target.value })}>
                  <option value="">--choose your university--</option>
                  <option value={1}>Seoul National University</option>
                </select>
              </div>

              <div className="box">

                <label className="label">Department</label>
                <select id="department-input" onChange={(event) => this.setState({ department: event.target.value })}>
                  <option value="">--choose your department--</option>
                  <option value={1}>Computer Science and Engineering</option>
                  <option value={2}>Electrical and Computer Engineering</option>
                </select>
              </div>

              <div className="box">

                <label className="label">Email</label>
                <input
                  id="email-input"
                  type="text"
                  value={this.state.title}
                  onChange={(event) => this.setState({ email: event.target.value })}
                />
              </div>

              <div className="box">

                <label className="label">First Name</label>
                <input
                  id="firstName-input"
                  type="text"
                  value={this.state.title}
                  onChange={(event) => this.setState({ firstName: event.target.value })}
                />
              </div>

              <div className="box">

                <label className="label">Last Name</label>
                <input
                  id="lastName-input"
                  type="text"
                  value={this.state.title}
                  onChange={(event) => this.setState({ lastName: event.target.value })}
                />
              </div>
              <div className="confirmBox">
                <button id="signup-button" onClick={() => this.signupHandler()}>
                  sign up
                </button>
              </div>
            </div>
          </div>
        </div>
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
