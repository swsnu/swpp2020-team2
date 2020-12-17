import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ImSearch } from 'react-icons/im';
import { GrFormAdd } from 'react-icons/gr';
import { MdGroupAdd } from 'react-icons/md';
import * as actionCreators from '../../../store/actions/index';
import TopBar from '../../../components/TopBar/TopBar';
import './GroupMain.css';

import GroupBox from '../../../components/groupBox/GroupBox';
import ReportGroup from '../../../components/Report/ReportGroup';

import { appLogo } from '../../../images/index';

class GroupMain extends Component {
  state = {
    searchQuery: '',
    modalBool: false,
    modalReportGroup: null,
  }

  componentDidMount() {
    if (localStorage.getItem('isLogin')!='true') this.props.history.replace('/main');

    this.props.getUserFull();
    this.props.getMyGroup();
    this.props.getLikeGroup();
    this.props.getNoticeGroup();
  }

  shouldComponentUpdate(nextProps, nextState) {
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

  onJoinHandler=async(id,op,joined)=>{
    if(joined)alert("You alreday joined this group!");
    else{
      const oper = op ? 'add' : 'remove';
      await this.props.joinGroup(id, oper);
      this.props.getUserFull();
    }
  }

  onDetailHandler=(id) => {
    this.props.history.push(`/group/details/${id}`);
  }

  onReportHandler = (group) => {
    this.setState({ modalBool: true, modalReportGroup: group });
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
    var joined = false;
    if(this.props.myGroups.find(haveThisGroup))joined=true;
    var joinRequested=false;
    if(this.props.userFullInfo?.join_requests?.find(haveThisGroup))joinRequested=true;
    return (
      <GroupBox
        key={group.id}
        name={group.name}
        description={group.description}
        liked={liked}
        like={() => this.onLikeHandler(group.id, !liked)}
        joined={joined}
        joinRequested={joinRequested}
        join={()=>this.onJoinHandler(group.id,!joinRequested,joined)}
        detail={() => this.onDetailHandler(group.id)}
        report={() => this.onReportHandler(group)}
      />
    );
  };

  render() {
    const otherGroupBoxes = null;// this var will not actually be used later
    let modal = null;
    if (this.state.modalBool) {
      modal = (
        <ReportGroup
          group={this.state.modalReportGroup}
          onClickCloseModal={() => this.setState({ modalBool: false })}
        />
      );
    }

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
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userFullInfo: state.ur.userFullInfo,
  myGroups: state.gr.myGroups,
  likeGroups: state.gr.likeGroups,
  noticeGroups: state.gr.noticeGroups,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
  getMyGroup: () => dispatch(actionCreators.getMyGroup()),
  getLikeGroup: () => dispatch(actionCreators.getLikeGroup()),
  getNoticeGroup: () => dispatch(actionCreators.getNoticeGroup()),
  likeGroup: (id, op) => dispatch(actionCreators.likeGroup(id, op)),
  noticeGroup: (id, op) => dispatch(actionCreators.noticeGroup(id, op)),
  joinGroup:(id,op)=>dispatch(actionCreators.joinGroup(id,op)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMain);
