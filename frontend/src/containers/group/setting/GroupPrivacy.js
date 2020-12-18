import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

import './GroupSetting.css'

import {BsDot} from 'react-icons/bs'

class GroupPrivacy extends Component {
  state = {
    privacy: 1,
  }

  componentDidMount() {
    if(localStorage.getItem('isLogin')!='true') this.props.history.replace('/main');
    this.props.getGroup(this.props.match.params.id);
    this.setState({
      privacy: this.props.currGroup?.privacy,
    })
  }

  onConfirmHandler = () => {
    this.props.changeGroupPrivacy(this.props.match.params.id, this.state.privacy);
  }

  onRouteHandler = (url) => {
    this.props.history.push(url);
  };

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
            <button className="groupPageBtn" onClick={() => this.onRouteHandler(`/group/details/${this.props.match.params.id}`)}>back</button>

            <div className="tabBar">
              <label>Group Settings</label>
              <div className="profileBtn" onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/profile`)} style={{color:"blue"}}>Profile</div>
              <div className="membersBtn" onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/members`)}>Manage members</div>
              <div className="privacyBtn" onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/privacy`)}>Privacy</div>
            </div>
          </div>

          <div className="right">

            <div className="header">
              <label>Privacy</label>
              <button className="confirmBtn" onClick={() => this.onConfirmHandler()}>Confirm</button>
            </div>

            <div className="body">
              <div className="box">
                <label><BsDot/> Allowed View Members</label>
                <div className="infoBox">
                  <select id="privacy-input" value={this.state.privacy} onChange={(event) => this.setState({ privacy: event.target.value })}>
                    <option value={1}>Only administrators</option>
                    <option value={2}>All users</option>
                    <option value={3}>No one</option>
                  </select>
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
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getGroup: (id) => dispatch(actionCreators.getGroup(id)),
  changeGroupPrivacy: (id, privacy) => dispatch(actionCreators.changeGroupPrivacy(id, privacy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPrivacy);
