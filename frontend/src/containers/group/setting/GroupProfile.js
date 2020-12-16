import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

import './GroupSetting.css';

class GroupProfile extends Component {
  state = {
    groupName: '',
    description: '',
  }

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
    this.setState({
      groupName:this.props.currGroup?.name,
      description:this.props.currGroup?.description
    })
  }

  onConfirmHandler = () => {
    if (this.state.groupName === '' || this.state.description === '') alert('please fill name and description!');
    else this.props.changeGroupInfo(this.props.match.params.id, this.state.groupName, this.state.description);
  }

  onRouteHandler = (url) => {
    this.props.history.push(url);
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
              <div onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/profile`)} style={{color:"blue"}}>Profile</div>
              <div onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/members`)}>Manage members</div>
              <div onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/privacy`)}>Privacy</div>
            </div>
          </div>

          <div className="right">

            <div className="header">
              <label>Profile</label>
              <button onClick={() => this.onConfirmHandler()}>Confirm</button>
            </div>

            <div className="body">
              <div className="box">
                <label>Group name</label>
                <div className="infoBox">
                  <input
                    id="groupname-input"
                    type="text"
                    value={this.state.groupName}
                    onChange={(event) => this.setState({ groupName: event.target.value })}
                  />
                </div>
              </div>

              <div className="box">
                <label>Description</label>
                <div className="infoBox">
                  <input
                    id="description-input"
                    type="text"
                    value={this.state.description}
                    onChange={(event) => this.setState({ description: event.target.value })}
                  />
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
  changeGroupInfo: (id, name, description) => dispatch(actionCreators.changeGroupInfo(id, name, description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupProfile);
