import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import JoinRequest from '../../../components/joinRequest/JoinReqeust';
import * as actionCreators from '../../../store/actions/index';

// we will use components/joinRequest,memberManage for table

class GroupMembers extends Component {
  state={
    userRequests: [],
  }

  componentDidMount() {
    // this.props.getGroupFull(this.props.match.params.id);
  }

  onConfirmHandler=() => {

  }

  onRouteHandler=(url) => {
    this.props.history.push(url);
  };

  makeJoinReqeustRow=(user) => (
    <div className="JoinReqeust">
      {user.name}
      {user.email}
      {user.department.name}
      <input
        type="checkbox"
      />
      <input
        type="checkbox"
      />
    </div>
  )

  render() {
    const users = [
      { name: 'name', email: 'email', department: { id: 1, name: 'dept' } },
    ];

    return (
      <div className="GroupMembers">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>
        <h1>Manage members</h1>
        <div className="box">
          <h2>Join application</h2>
          <label className="label">Name/Email/Dept/Accept/Reject</label>
          <h3>join request table</h3>
          {users.map(this.makeJoinReqeustRow)}
          <label className="label">Name/Email/Dept/Admin/Expel</label>
          <h3>members manage table</h3>
          <label className="label">Name/Email/Dept/King</label>
          <h3>king manage table</h3>
        </div>
        <button onClick={() => this.onConfirmHandler()}>Confirm</button>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getGroupFull: (id) => dispatch(actionCreators.getGroupFull(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
