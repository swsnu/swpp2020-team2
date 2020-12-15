import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class SettingPassword extends Component {
  state={
    currPassword: '',
    newPassword: '',
    confirmPassword: '',
    revealCurrPassword: false,
    revealNewPassword: false,
    revealConfirmPassword: false,
  }

  componentDidMount() {
    this.props.getUser();
  }

  onConfirmHandler=() => {
    // need currPassword check
    if (this.state.newPassword !== this.state.confirmPassword)alert('Please confirm your password correctly');
    else this.props.changePassword(this.state.currPassword, this.state.newPassword);
  }

  onRouteHandler=(url) => {
    // alert if there is unsaved content
    this.props.history.push(url);
  }

  render() {
    return (
      <div className="MyPage">
        <div className="topBar">
          <TopBar
            tabNum={null}
            history={this.props.history}
          />
        </div>
        <h1>Password Setting</h1>
        <div className="box">
          <label className="label">Current Password</label>
          <div className="inputBox">
            <input
              id="currPassword-input"
              type={this.state.revealCurrPassword ? 'text' : 'password'}
              value={this.state.currPassword}
              onChange={(event) => this.setState({ currPassword: event.target.value })}
            />
            <div className="toggle" onClick={() => this.setState((prevState) => ({ revealCurrPassword: !prevState.revealCurrPassword }))}>
              {this.state.revealCurrPassword
                ? <FontAwesomeIcon icon={faEyeSlash} />
                : <FontAwesomeIcon icon={faEye} />}
            </div>
          </div>
        </div>
        <div className="box">
          <label className="label">New Password</label>
          <div className="inputBox">
            <input
              id="newPassword-input"
              type={this.state.revealNewPassword ? 'text' : 'password'}
              value={this.state.newPassword}
              onChange={(event) => this.setState({ newPassword: event.target.value })}
            />
            <div className="toggle" onClick={() => this.setState((prevState) => ({ revealNewPassword: !prevState.revealNewPassword }))}>
              {this.state.revealNewPassword
                ? <FontAwesomeIcon icon={faEyeSlash} />
                : <FontAwesomeIcon icon={faEye} />}
            </div>
          </div>
        </div>
        <div className="box">
          <label className="label">Confirm New Password</label>
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
        <button onClick={() => this.onConfirmHandler()}>Confirm</button>

        <button onClick={() => this.onRouteHandler('/mypage')}>back</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/profile')}>Profile</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/password')}>Change Password</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/preference')}>Preference</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.ur.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actionCreators.getUser()),
  changePassword: (oldPassword, password) => dispatch(actionCreators.changePassword(oldPassword, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPassword);
