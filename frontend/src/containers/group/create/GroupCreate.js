import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

import './GroupCreate.css'

import { HiUserGroup } from 'react-icons/hi';

class GroupCreate extends Component {
  state = {
    groupName: '',
    groupDescription: '',
  }

  componentDidMount() {
    if(localStorage.getItem('isLogin')!='true') this.props.history.replace('/main');
    this.props.getUser();
  }

  onCreateHandler = async() => {
    if (this.state.groupName === '' || this.state.groupDescription === '') alert('You should write group name and description!');
    else {
      await this.props.createGroup({
        name: this.state.groupName,
        king: this.props.signinedUser,
        description: this.state.groupDescription,
      });
      this.props.history.push(`/group/details/${this.props.currGroup?.id}`);
    }
  }

  render() {
    return (
      <div className="GroupCreate">

        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>

        <div className="container">
          <div className="header">
            <h1>Create Group</h1>
            <button id="create-group-button" onClick={() => this.onCreateHandler()}>Create</button>
          </div>

          <div className="body">

            <div className="left">
              <HiUserGroup size={100} />
            </div>

            <div className="right">

              <div className="inputBox">
                <label>Group Name</label>
                <input
                  id="group-name-input"
                  type="text"
                  value={this.state.groupName}
                  onChange={(event) => this.setState({ groupName: event.target.value })}
                />
              </div>

              <div className="inputBox">
                <label>Group Description</label>
                <textarea
                  id="group-description-input"
                  type="text"
                  rows="4"
                  value={this.state.groupDescription}
                  onChange={(event) => this.setState({ groupDescription: event.target.value })}
                />
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
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actionCreators.getUser()),
  createGroup: (args) => dispatch(actionCreators.createGroup(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreate);
