import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

class GroupCreate extends Component {
  state={
    groupName: '',
    groupDescription: '',
  }

  componentDidMount() {
    this.props.getUser();
  }

  onCreateHandler=() => {

  }

  render() {
    return (
      <div className="GroupCreate">
        <div className="topBar">
          <TopBar 
          tabNum={2}
          history={this.props.history}/>
        </div>

        <h1>Create Group</h1>

        <div>
          Group Name:
          <input
            id="group-name-input"
            type="text"
            value={this.state.groupName}
            onChange={(event) => this.setState({ groupName: event.target.value })}
          />
        </div>
        <div>
          Group Description:
          <textarea
            id="group-description-input"
            type="text"
            rows="4"
            value={this.state.groupDescription}
            onChange={(event) => this.setState({ groupDescription: event.target.value })}
          />
        </div>
        <button id="create-group-button" onClick={() => this.onCreateHandler()}>Create group!</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userInfo: state.ur.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actionCreators.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreate);
