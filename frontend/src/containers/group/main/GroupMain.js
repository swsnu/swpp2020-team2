import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ImSearch } from 'react-icons/im';
import { GrFormAdd } from 'react-icons/gr';
import { MdGroupAdd } from 'react-icons/md';
import * as actionCreators from '../../../store/actions/index';
import TopBar from '../../../components/TopBar/TopBar';
import './GroupMain.css';

import GroupBox from '../../../components/groupBox/GroupBox';

import { appLogo } from '../../../images/index';

class GroupMain extends Component {
  state = {
    searchQuery: '',
  }

  componentDidMount() {
    this.props.getUserFull();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.signinedUser) this.props.history.replace('/main');
  }

  onSearchHandler = () => {
    if (this.state.searchQuery !== '') this.props.history.push(`/group/search/${this.state.searchQuery}`);
  }

  render() {
    const joinedGroup = this.props.userFullInfo?.members;
    const noticedGroup = this.props.userFullInfo?.gets_notification;
    const likedGroup = this.props.userFullInfo?.likes_group;
    const otherGroup = null;
    const joinedGroupBoxes = null;
    const noticedGroupBoxes = null;
    const likedGroupBoxes = null;
    const otherGroupBoxes = null;

    // should implement components/groupbox/Groupbox first
    // joinedGroup will show groupboxes of joinedGroup
    // same for noticeGroup, likedGroup, otherGroup.

    return (
      <div className="GroupMain">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>

        <div className="container">

          <div className="header">
            <div className="searchBox">
              <input
                className="search-group-input"
                type="text"
                value={this.state.searchKey}
                onChange={(event) => this.setState({ searchQuery: event.target.value })}
                placeholder=" 그룹명 입력 "
              />
              <button className="search-button" onClick={() => this.onSearchHandler()}>
                <ImSearch size="24" />
              </button>
            </div>

            <div className="createBox">
              <button className="create-group-button" onClick={() => this.props.history.push('/group/create')}>
                <MdGroupAdd size="24" />
                <div className="text">Create Group</div>
              </button>
            </div>
          </div>

          <div>search with blank to see all groups</div>

          <div className="sectionBox">

            <div className="section">
              <div className="labelBox">
                <label>My Groups</label>
              </div>

              <div className="containerBox">
                <GroupBox
                  image={appLogo}
                  name="group"
                  description="description"
                  like={() => {}}
                  notice={() => {}}
                  report={() => {}}
                />
                {joinedGroupBoxes}
              </div>
            </div>

            <div className="section">
              <div className="labelBox">
                <label>Noticing Groups</label>
              </div>

              <div className="containerBox">
                {noticedGroupBoxes}
              </div>
            </div>

            <div className="section">
              <div className="labelBox">
                <label>Liked Groups</label>
              </div>

              <div className="containerBox">
                {likedGroupBoxes}
              </div>
            </div>

            <div className="section">
              <div className="labelBox">
                <label>Others</label>
                <button className="search-all-button" onClick={() => this.props.history.push('/group/search')}>
                  <GrFormAdd size="12" />
                  <div className="text">더보기</div>
                </button>
              </div>

              <div className="containerBox">
                {otherGroupBoxes}
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
  userFullInfo: state.ur.userFullInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMain);
