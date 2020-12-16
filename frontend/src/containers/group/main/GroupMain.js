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
    this.props.getUser();
    this.props.getMyGroup();
    this.props.getLikeGroup();
    this.props.getNoticeGroup();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.signinedUser) this.props.history.replace('/main');
  }

  shouldComponentUpdate(nextProps,nextState){
    return true;
  }

  onSearchHandler = () => {
    if (this.state.searchQuery !== '') this.props.history.push(`/group/search/${this.state.searchQuery}`);
  }

  onLikeHandler=async (id, op) => {
    const oper = op ? 'add' : 'remove';
    await this.props.likeGroup(id, oper);
    this.props.getLikeGroup();
  }

  onNoticeHandler=async (id, op) => {
    const oper = op ? 'add' : 'remove';
    await this.props.noticeGroup(id, oper);
    this.props.getNoticeGroup();
  }

  onDetailHandler=(id) => {
    this.props.history.push(`/group/details/${id}`);
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
        detail={() => this.onDetailHandler(group.id)}
        report={() => {}}
      />
    );
  };

  render() {
    const otherGroupBoxes = null;// this var will not actually be used later

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

          <div className="sectionBox">

            <div className="section">
              <div className="labelBox">
                <label>My Groups</label>
              </div>

              <div className="containerBox">
                {this.props.myGroups.map(this.makeGroupBox)}
              </div>
            </div>

            <div className="section">
              <div className="labelBox">
                <label>Noticing Groups</label>
              </div>

              <div className="containerBox">
                {this.props.noticeGroups.map(this.makeGroupBox)}
              </div>
            </div>

            <div className="section">
              <div className="labelBox">
                <label>Liked Groups</label>
              </div>

              <div className="containerBox">
                {this.props.likeGroups.map(this.makeGroupBox)}
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
  myGroups: state.gr.myGroups,
  likeGroups: state.gr.likeGroups,
  noticeGroups: state.gr.noticeGroups,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actionCreators.getUser()),
  getMyGroup: () => dispatch(actionCreators.getMyGroup()),
  getLikeGroup: () => dispatch(actionCreators.getLikeGroup()),
  getNoticeGroup: () => dispatch(actionCreators.getNoticeGroup()),
  likeGroup: (id, op) => dispatch(actionCreators.likeGroup(id, op)),
  noticeGroup: (id, op) => dispatch(actionCreators.noticeGroup(id, op)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMain);
