import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class SettingProfile extends Component {
  state={
    firstName: '',
    lastName: '',
    department: null,
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getDepartments();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userInfo) {
      return {
        firstName: props.userInfo.first_name,
        lastName: props.userInfo.last_name,
        department: props.userInfo.department.id,
      };
    }
    return state;
  }

  onConfirmHandler=() => {
    // use user info modify api
  }

  onRouteHandler=(url) => {
    // alert if there is unsaved content
    this.props.history.push(url);
  }

  render() {
    var makeOption = function func(X) {
      return <option value={X.id}>{X.name}</option>;
    };

    return (
      <div className="MyPage">
        <div className="topBar">
          <TopBar
            tabNum={null}
            history={this.props.history}
          />
        </div>
        <h1>Profile Setting</h1>
        <div className="box">
          <label className="label">First name:</label>
          <div className="inputBox">
            <input
              id="firstname-input"
              type="text"
              value={this.state.firstName}
              onChange={(event) => this.setState({ firstName: event.target.value })}
            />
          </div>
        </div>
        <div className="box">
          <label className="label">Last name:</label>
          <div className="inputBox">
            <input
              id="lastname-input"
              type="text"
              value={this.state.lastName}
              onChange={(event) => this.setState({ lastName: event.target.value })}
            />
          </div>
        </div>
        <div className="box">
          <label className="label">
            ID:
            {this.props.userInfo.username}
          </label>
        </div>
        <div className="box">
          <label className="label">
            University:
            {this.props.userInfo.university.name}
          </label>
        </div>
        <div className="box">
          <label className="label">Department:</label>
          <select id="deparment-input" value={this.props.userInfo.department.id} onChange={(event) => this.setState({ department: event.target.value })}>
            {this.props.universities.map(makeOption)}
          </select>
        </div>
        <div className="box">
          <label className="label">
            Email:
            {this.props.userInfo.email}
          </label>
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
  departments: state.or.departments,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actionCreators.getUser()),
  getDepartments: () => dispatch(actionCreators.getDepartments()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingProfile);