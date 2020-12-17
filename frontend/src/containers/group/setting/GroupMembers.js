import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import JoinRequest from '../../../components/JoinRequest/JoinRequest';
import ManageMember from '../../../components/ManageMember/ManageMember';
import * as actionCreators from '../../../store/actions/index';

import {BsDot} from 'react-icons/bs'

import './GroupSetting.css'

class GroupMembers extends Component {
  state = {
    joinRequests: [],
    manageMembers: [],
    firstUpdate:true,
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getGroupFull(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currGroup && this.state.firstUpdate) {
      var joinRequests = [];
      for (var user of props.currGroup.join_requests) {
        joinRequests[user.id] = { accept: false, reject: false };
      }
      var manageMembers = [];
      for (var member of props.currGroup.member) {
        var admin = false;
        if (props.currGroup.admin.find(e => e.id === member.id)) admin = true;
        manageMembers[member.id] = { admin, expel: false };
      }
      return { joinRequests, manageMembers, firstUpdate:false };
    }
    return state;
  }

  onConfirmHandler = () => {
    for (var user of this.props.currGroup.join_requests) {
      if (this.state.joinRequests[user.id].accept) {
        this.props.manageMember(this.props.match.params.id, user.id, 'add');
      }
      if (this.state.joinRequests[user.id].reject) {
        this.props.handleJoinRequest(this.props.match.params.id, user.id, 'remove');
      }
    }
    for (var member of this.props.currGroup.member) {
      if (this.state.manageMembers[member.id].expel) {
        this.props.manageMember(this.props.match.params.id, member.id, 'remove');
      }
      else if (this.state.manageMembers[member.id].admin) {
        this.props.manageAdmin(this.props.match.params.id, member.id, 'add');
      }
    }
  }

  onRouteHandler = (url) => {
    this.props.history.push(url);
  }

  joinRequestHandler = (id, op) => {
    var joinRequests = this.state.joinRequests.slice();
    if (op === 'accept') {
      if (this.state.joinRequests[id].accept) {
        joinRequests[id] = { accept: false, reject: false };
      }
      else {
        joinRequests[id] = { accept: true, reject: false };
      }
    }
    else {
      if (this.state.joinRequests[id].reject) {
        joinRequests[id] = { accept: false, reject: false };
      }
      else {
        joinRequests[id] = { accept: false, reject: true };
      }
    }
<<<<<<< HEAD
    this.setState((prevState)=>({ joinRequests,manageMembers:prevState.manageMembers, firstUpdate:false }));
=======
    //this.setState({ ...this.state, joinRequests });
    this.setState((prevState)=>({ joinRequests,manageMembers:prevState.manageMembers }));
>>>>>>> b3b198fbb489ed30ef57ea2cd27f5d2829701cb3
  }

  manageMembersHandler = (id, op) => {
    if (id === this.props.signinedUser) alert('You cannot deauthorize/expel yourself!');
    else {
      var manageMembers = this.state.manageMembers.slice();
      if (op === 'admin') {
        if (this.state.manageMembers[id].admin) {
          manageMembers[id] = { admin: false, expel: false };
        }
        else {
          manageMembers[id] = { admin: true, expel: false };
        }
      }
      else {
        if (this.state.manageMembers[id].expel) {
          manageMembers[id] = { admin: false, expel: false };
        }
        else {
          manageMembers[id] = { admin: false, expel: true };
        }
      }
      this.setState((prevState)=>({ joinRequests:prevState.joinRequests,manageMembers, firstUpdate:false }));
    }
  }

  makeJoinReqeustRow = (user) => {
    return (
      <JoinRequest
        key={user.id}
        firstName={user.first_name}
        lastName={user.last_name}
        email={user.email}
        department={user.department.name}
        accept={this.state.joinRequests[user.id]?.accept}
        clickAccept={() => this.joinRequestHandler(user.id, 'accept')}
        reject={this.state.joinRequests[user.id]?.reject}
        clickReject={() => this.joinRequestHandler(user.id, 'reject')}
      />
    );
  }

  makeMembersManageRow = (member) => {
    return (
      <ManageMember
        key={member.id}
        firstName={member.first_name}
        lastName={member.last_name}
        email={member.email}
        department={member.department.name}
        admin={this.state.manageMembers[member.id]?.admin}
        clickAdmin={() => this.manageMembersHandler(member.id, 'admin')}
        expel={this.state.manageMembers[member.id]?.expel}
        clickExpel={() => this.manageMembersHandler(member.id, 'expel')}
      />
    );
  }

  render() {
    return (
      <div className="SettingGroup">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>

        <div className="container">

          <div className="left">
            <button onClick={() => this.onRouteHandler(`/group/details/${this.props.match.params.id}`)}>back</button>
            <div className="tabBar">
              <label>Group Settings</label>
              <div onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/profile`)}>Profile</div>
              <div onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/members`)} style={{ color: "blue" }}>Manage members</div>
              <div onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/privacy`)}>Privacy</div>
            </div>
          </div>

          <div className="right">
            <div className="header">
              <label>Manage members</label>
              <button onClick={() => this.onConfirmHandler()}>Confirm</button>
            </div>

            <div className="body">

              <div className="box">
                <label><BsDot/> Join application ({this.props.currGroup?.join_requests.length})</label>
                <div className="infoBox">
                  <div className="label">
                    <label className="col1" style={{ flex: 2 }}>Name</label>
                    <label className="col2" style={{ flex: 3 }}>Email</label>
                    <label className="col3" style={{ flex: 3 }}>Dept</label>
                    <label className="col4" style={{ flex: 1, color: "blue" }}>Accept</label>
                    <label className="col5" style={{ flex: 1, color: "red" }}>Reject</label>
                  </div>

                  <div className="info">
                    {this.props.currGroup?.join_requests.map(this.makeJoinReqeustRow)}
                  </div>
                </div>
              </div>

              <div className="box">
                <label><BsDot/> Member List ({this.props.currGroup?.member.length})</label>
                <div className="infoBox">
                  <div className="label">
                    <label className="col1" style={{ flex: 2 }}>Name</label>
                    <label className="col2" style={{ flex: 3 }}>Email</label>
                    <label className="col3" style={{ flex: 3 }}>Dept</label>
                    <label className="col4" style={{ flex: 1, color: "blue" }}>Admin</label>
                    <label className="col5" style={{ flex: 1, color: "red" }}>Expel</label>
                  </div>
                  {this.props.currGroup?.member.map(this.makeMembersManageRow)}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actionCreators.getUser()),
  getGroupFull: (id) => dispatch(actionCreators.getGroupFull(id)),
  manageMember: (groupId, userId, op) => dispatch(actionCreators.manageMember(groupId, userId, op)),
  manageAdmin: (groupId, userId, op) => dispatch(actionCreators.manageAdmin(groupId, userId, op)),
  handleJoinRequest: (groupId, userId, op) => dispatch(actionCreators.handleJoinRequest(groupId, userId, op)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
