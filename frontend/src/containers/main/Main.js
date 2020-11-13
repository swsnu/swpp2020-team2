import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import './Main.css';
import { appLogo } from '../../images/index';

class Main extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.signinedUser !== this.props.signinedUser) {
      if (this.props.signinedUser) this.props.history.replace('/public');
    }
  }

  signinHandler = () => {
    if (this.state.username === '' || this.state.password === '') {
      alert('please fill in ID and password.');
      return;
    }
    this.props.signin({ username: this.state.username, password: this.state.password });
  }

  render() {
    return (
      <div className="Main">
        <div className="top">
          <div className="title">Almanac</div>
          <div className="description">A university events calendar</div>
        </div>

        <div className="content">

          <img className="logo" src={appLogo} />

          <div className="container">
            <div className="signInBox">
              <h2>Sign In</h2>
              <div className="idBox">
                <label className="label">ID</label>
                <input
                  id="username-input"
                  type="text"
                  value={this.state.title}
                  onChange={(event) => this.setState({ username: event.target.value })}
                />
              </div>
              <div className="passwordBox">
                <label className="label">Password</label>
                <input
                  id="password-input"
                  type="text"
                  value={this.state.title}
                  onChange={(event) => this.setState({ password: event.target.value })}
                />
              </div>
            </div>

            <div className="confirmBox">
              <button type="button" id="signin-button" onClick={() => this.signinHandler()}>
                sign in
              </button>
              <div className="signUpBox">
                <span onClick={() => this.props.history.push('/signup')}>
                  Sign Up?
                </span>
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
  signin: (args) => dispatch(actionCreators.signIn(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
