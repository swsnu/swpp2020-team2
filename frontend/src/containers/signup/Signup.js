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
    confirmPassword: '',
    university: 1,
    department: 1,
    email: '',
    firstName: '',
    lastName: '',
    revealPassword: false,
    revealConfirmPassword: false,
  }

  componentDidMount() {
    this.props.getUniversities();
    this.props.getDepartments();
  }

  componentDidUpdate(prevProps) {
    if (this.props.signinedUser !== prevProps.signinedUser) {
      if (this.props.signinedUser) this.props.history.replace('/public');
    }
  }

  signupHandler = () => {
    if (this.state.username === '' || this.state.password === '' || this.state.confirmPassword === '' || this.state.email === '' || this.state.firstName === '' || this.state.lastName === '') {
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
    if (this.state.password !== this.state.confirmPassword) {
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

  render() {
    var makeOption = function func(X) {
      return <option value={X.id}>{X.name}</option>;
    };

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
                <div className="inputBox">
                  <input
                    id="username-input"
                    type="text"
                    value={this.state.username}
                    onChange={(event) => this.setState({ username: event.target.value })}
                  />
                </div>
              </div>

              <div className="box">

                <label className="label">Password</label>
                <div className="inputBox">
                  <input
                    id="password-input"
                    type={this.state.revealPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={(event) => this.setState({ password: event.target.value })}
                  />
                  <div className="toggle" onClick={() => this.setState((prevState) => ({ revealPassword: !prevState.revealPassword }))}>
                    {this.state.revealPassword
                      ? <FontAwesomeIcon icon={faEyeSlash} />
                      : <FontAwesomeIcon icon={faEye} />}
                  </div>
                </div>

              </div>

              <div className="box">

                <label className="label">Confirm Password</label>
                <div className="inputBox">
                  <input
                    id="confirmPassword-input"
                    type={this.state.revealConfirmPassword ? 'text' : 'password'}
                    value={this.state.confirmPassword}
                    onChange={(event) => this.setState({ confirmPassword: event.target.value })}
                  />
                  <div className="toggle" onClick={() => this.setState((prevState) => ({ revealConfirmPassword: !prevState.revealConfirmPassword }))}>
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
                  {this.props.universities.map(makeOption)}
                </select>
              </div>

              <div className="box">

                <label className="label">Department</label>
                <select id="department-input" onChange={(event) => this.setState({ department: event.target.value })}>
                  <option value="">--choose your department--</option>
                  {this.props.departments.map(makeOption)}
                </select>
              </div>

              <div className="box">

                <label className="label">Email</label>
                <div className="inputBox">
                  <input
                    id="email-input"
                    type="text"
                    value={this.state.email}
                    onChange={(event) => this.setState({ email: event.target.value })}
                  />
                </div>
              </div>

              <div className="box">

                <label className="label">First Name</label>
                <div className="inputBox">
                  <input
                    id="firstName-input"
                    type="text"
                    value={this.state.firstName}
                    onChange={(event) => this.setState({ firstName: event.target.value })}
                  />
                </div>
              </div>

              <div className="box">

                <label className="label">Last Name</label>
                <div className="inputBox">
                  <input
                    id="lastName-input"
                    type="text"
                    value={this.state.lastName}
                    onChange={(event) => this.setState({ lastName: event.target.value })}
                  />
                </div>
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
  universities: state.or.universities,
  departments: state.or.departments,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (args) => dispatch(actionCreators.signUp(args)),
  getUniversities: () => dispatch(actionCreators.getUniversities()),
  getDepartments: () => dispatch(actionCreators.getDepartments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
