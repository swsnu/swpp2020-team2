import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

import { ImSearch } from 'react-icons/im'
import { GrFormAdd } from 'react-icons/gr'
import { MdGroupAdd } from 'react-icons/md'
import './GroupMain.css'

class GroupMain extends Component {
  state = {
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

  onSearchHandler = () => {
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
    const otherGroupBoxes = null;

    // should implement components/groupbox/Groupbox first
    // joinedGroup will show groupboxes of joinedGroup
    // same for noticeGroup, likedGroup.

    return (
      <div className="GroupMain">
        <div className="topBar">
          <TopBar 
          tabNum={2}
          history={this.props.history} />
        </div>

        <div className="container">

          <div className="header">
            <div className="searchBox">
              <input
                className="search-group-input"
                type="text"
                value={this.state.searchKey}
                onChange={(event) => this.setState({ searchKey: event.target.value })}
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
              <label>My Groups</label>
              {joinedGroupBoxes}
            </div>

            <div className="section">
              <label>Noticing Groups</label>
              {noticedGroupBoxes}
            </div>

            <div className="section">
              <label>Liked Groups</label>
              {likedGroupBoxes}
            </div>

            <div className="section">
              <label>Others</label>
              <button onClick={() => this.props.history.push('/group/search')}>
                <GrFormAdd size="12" />
                <div className="text">더보기</div>
              </button>
              {otherGroupBoxes}
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