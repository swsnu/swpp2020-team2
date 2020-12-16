import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

import './SettingProfile.css'

class SettingProfile extends Component {
  state = {
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
    if(this.state.firstName===''||this.state.lastName==='')alert('You should fill names!');
    else{
      this.props.changeUserInfo(this.props.firstName, this.props.lastName, this.props.department);
      alert('Setting has been applied!');
    }
  }

  onRouteHandler = (url) => {
    this.props.history.push(url);
  }

  render() {
    var makeOption = function func(X) {
      return <option value={X.id}>{X.name}</option>;
    };

    return (
      <div className="SettingProfile">
        <div className="topBar">
          <TopBar
            tabNum={null}
            history={this.props.history}
          />
        </div>

        <div className="container">
          <div className="left">
            <button onClick={() => this.onRouteHandler('/mypage')}>back</button>

            <div className="tabBar">
              <lable>Profile Settings</lable>
              <button onClick={() => this.onRouteHandler('/mypage/setting/profile')}>Profile</button>
              <button onClick={() => this.onRouteHandler('/mypage/setting/password')}>Change Password</button>
              <button onClick={() => this.onRouteHandler('/mypage/setting/preference')}>Preference</button>
            </div>
          </div>

          <div className="right">

            <div className="header">
              <label>Profile Setting</label>
              <button onClick={() => this.onConfirmHandler()}>Confirm</button>
            </div>

            <div className="body">

              <div className="box">
                <label>First name</label>
                <div className="infoBox">
                  <input
                    id="firstname-input"
                    type="text"
                    value={this.state.firstName}
                    onChange={(event) => this.setState({ firstName: event.target.value })}
                  />
                </div>
              </div>

              <div className="box">
                <label>Last name</label>
                <div className="infoBox">
                  <input
                    id="lastname-input"
                    type="text"
                    value={this.state.lastName}
                    onChange={(event) => this.setState({ lastName: event.target.value })}
                  />
                </div>
              </div>
              <div className="box">
                <label>ID</label>
                <div className="infoBox">
                  {this.props.userInfo?.username}
                </div>

              </div>
              <div className="box">
                <label>University</label>
                <div className="infoBox">
                  {this.props.userInfo?.university.name}
                </div>

              </div>

              <div className="box">
                <label>Department</label>
                <div className="infoBox">
                  <select id="deparment-input" value={this.props.userInfo?.department.id} onChange={(event) => this.setState({ department: event.target.value })}>
                    {this.props.departments.map(makeOption)}
                  </select>
                </div>
              </div>

              <div className="box">
                <label>Email</label>
                <div className="infoBox">
                  {this.props.userInfo?.email}
                </div>
              </div>

            </div>
          </div>
        </div>
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
  changeUserInfo: (firstName, lastName, department) => dispatch(actionCreators.changeUserInfo(firstName, lastName, department)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingProfile);
