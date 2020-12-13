import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ImSearch } from 'react-icons/im';
import { MdGroupAdd } from 'react-icons/md';
import TopBar from '../../../components/TopBar/TopBar';
import GroupBox from '../../../components/groupBox/GroupBox';

import * as actionCreators from '../../../store/actions/index';

import './GroupSearch.css';

class GroupSearchAll extends Component {
  state={
    searchQuery: '',
  }

  componentDidMount() {
    this.props.getUserFull();
    this.props.getAllGroup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.signinedUser) this.props.history.replace('/main');
  }

  onSearchHandler=() => {
    if (this.state.searchQuery !== '') this.props.history.push(`/group/search/${this.state.searchQuery}`);
  }

  makeGroupBox = (group) => {
    function haveThisGroup(element) {
      if (element.id === group.id) return true;
      return false;
    }
    var liked = false;
    if (this.props.likeGroups.find(haveThisGroup))liked = true;
    var noticed = false;
    if (this.props.noticeGroups.find(haveThisGroup))noticed = true;
    return (
      <GroupBox
        key={group.id}
        name={group.name}
        description={group.description}
        liked={liked}
        like={() => this.onLikeHandler(group.id, !liked)}
        noticed={noticed}
        notice={() => this.onNoticeHandler(group.id, !noticed)}
        report={() => {}}
      />
    );
  };

  render() {
    return (
      <div className="GroupSearch">
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

          <h2>All Groups Result</h2>
          {this.props.searchGroups.map(this.makeGroupBox)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userFullInfo: state.ur.userFullInfo,
  searchGroups: state.gr.searchGroups,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
  getAllGroup: () => dispatch(actionCreators.getAllGroup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearchAll);
