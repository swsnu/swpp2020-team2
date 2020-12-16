import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

class GroupDetail extends Component {
  state={

  }

  componentDidMount() {
    this.props.getUserFull();
    this.props.getGroup(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.signinedUser) this.props.history.replace('/main');
  }

  render() {
    let settingButton=<button className="settingsBtn" onClick={this.props.history.push(`/group/${this.props.match.params.id}/setting/profile`)}>Group Settings</button>
    if(!this.props.currGroup.admin.find(e=>e.id===this.props.signinedUser))settingButton=null;

    return (
      <div className="GroupDetail">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>

        {this.props.currGroup?.name}
        {this.props.currGroup?.description}
        {settingButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userFullInfo: state.ur.userFullInfo,
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
  getGroup: (id) => dispatch(actionCreators.getGroup(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);
