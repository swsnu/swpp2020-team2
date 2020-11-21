import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

class GroupMain extends Component {
  state={
    searchKey: '',
  }

  componentDidMount() {
    this.props.getUserFull();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (!this.props.signinedUser) this.props.history.replace('/Main');
    }
  }

  onSearchHandler=() => {
    if (this.state.searchKey === '') this.props.history.push('/group/search');
    else this.props.history.push(`/group/search/${this.state.searchKey}`);
  }

  render() {
    const joinedGroup = this.props.userFullInfo?.members;
    const noticedGroup = this.props.userFullInfo?.gets_notification;
    const likedGroup = this.props.userFullInfo?.likes_group;
    const joinedGroupBoxes = null;
    const noticedGroupBoxes = null;
    const likedGroupBoxes = null;

    // please implement components/groupbox/Groupbox first
    // joinedGroup will show groupboxes of joinedGroup
    // same for noticeGroup, likedGroup.

    return (
      <div className="GroupMain">
        <div>
          <TopBar />
        </div>

        <h1>Group</h1>

        <div><button id="create-group-button" onClick={() => this.props.history.push('/group/create')}>Create Group</button></div>
        <br />
        <input
          id="search-input"
          type="text"
          value={this.state.searchKey}
          onChange={(event) => this.setState({ searchKey: event.target.value })}
        />
        <button id="search-button" onClick={() => this.onSearchHandler()}>Search!</button>
        <div>search with blank to see all groups</div>
        <h2>My Groups</h2>
        {joinedGroupBoxes}
        <h2>Noticing Groups</h2>
        {noticedGroupBoxes}
        <h2>Liked Groups</h2>
        {likedGroupBoxes}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userFullInfo: state.ur.userFullInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMain);
