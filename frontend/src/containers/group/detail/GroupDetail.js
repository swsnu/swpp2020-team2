import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GrLike } from 'react-icons/gr';
import { BiBellPlus } from 'react-icons/bi';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { FiSettings } from 'react-icons/fi'
import { BsBellFill } from 'react-icons/bs';
import { AiFillLike } from 'react-icons/ai';
import {BsPersonPlus, BsPersonPlusFill} from 'react-icons/bs';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

import GroupBox from '../../../components/groupBox/GroupBox';
import ReportGroup from '../../../components/Report/ReportGroup';

import './GroupDetail.css';

class GroupDetail extends Component {
  state={
    modalBool: false,
    modalReportGroup: null,
  }

  componentDidMount() {
    if(localStorage.getItem('isLogin')!='true') this.props.history.replace('/main');
    this.props.getUserFull();
    this.props.getGroupFull(this.props.match.params.id);
    this.props.getMyGroup();
    this.props.getLikeGroup();
  }

  onLikeHandler=async (id, op) => {
    const oper = op ? 'add' : 'remove';
    await this.props.likeGroup(id, oper);
    this.props.getLikeGroup();
  }

  onJoinHandler=async (id,op)=>{
    const oper = op ? 'add' : 'remove';
    await this.props.joinGroup(id, oper);
    this.props.getUserFull();
  }

  onReportHandler = (group) => {
    this.setState({ modalBool: true, modalReportGroup: group });
  }

  render() {
    if (this.props.currGroup === null || this.props.currGroup === undefined) return null;
    if (this.props.currGroup.admin === undefined) return null;
    let settingButton = <div className="settingsBtn" onClick={() => this.props.history.push(`/group/${this.props.match.params.id}/setting/profile`)}><FiSettings size={40} /></div>;
    if (this.props.currGroup === null || !this.props.currGroup.admin.find((e) => e === this.props.signinedUser))settingButton = null;

    var liked = false;
    if (this.props.likeGroups?.find((e) => e.id === this.props.currGroup.id))liked = true;
    var joined=false;
    if(this.props.myGroups?.find((e)=>e.id===this.props.currGroup.id))joined=true;
    var joinRequested=false;
    if(this.props.userFullInfo?.join_requests.find((e)=>e.id===this.props.currGroup.id))joinRequested=true;

    var joinReqeustButton=(
      <div className="btn" onClick={() => this.onJoinHandler(this.props.currGroup?.id, !joinRequested)}>
        {joinRequested ? <BsPersonPlus color="orange" /> : <BsPersonPlus color="black" />}
      </div>
    );
    if(joined){
      joinReqeustButton=(
        <div className="btn" onClick={() => alert("You already joined this group!")}>
          <BsPersonPlusFill color="blue" />
        </div>
      );
    }


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
      <div className="GroupDetail">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>
        <div className="header">
          <div className="name">{this.props.currGroup?.name}</div>
          {settingButton}
        </div>
        <div className="content">
          <div className="row0">
            <div className="btn" onClick={() => this.onLikeHandler(this.props.currGroup?.id, !liked)}>
              {liked ? <AiFillLike color="blue" /> : <GrLike color="black" />}
            </div>
            {joinReqeustButton}
            <div className="btn" onClick={() => this.onReportHandler(this.props.currGroup)}>
              <RiAlarmWarningFill color="red" />
            </div>
          </div>
          <div className="row1">
            <div className="key">Group Name</div>
            <div className="value">{this.props.currGroup?.name}</div>
          </div>
          <div className="row2">
            <div className="key">Description</div>
            <p className="value">{this.props.currGroup?.description}</p>
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
  currGroup: state.gr.currGroup,
  myGroups: state.gr.myGroups,
  likeGroups: state.gr.likeGroups,
});

const mapDispatchToProps = (dispatch) => ({
  getMyGroup: () => dispatch(actionCreators.getMyGroup()),
  getLikeGroup: () => dispatch(actionCreators.getLikeGroup()),
  getUserFull: () => dispatch(actionCreators.getUserFull()),
  getGroupFull: (id) => dispatch(actionCreators.getGroupFull(id)),
  likeGroup: (id, op) => dispatch(actionCreators.likeGroup(id, op)),
  joinGroup: (id,op) => dispatch(actionCreators.joinGroup(id,op)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);
