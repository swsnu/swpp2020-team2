import React, { Component } from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import { GoDiffAdded, GoReport } from 'react-icons/go';
import { BiEditAlt } from 'react-icons/bi';
import { GrLike } from 'react-icons/gr';

import * as actionCreators from '../../../store/actions/index';
import './EventDetail.css';

import TopBar from '../../../components/TopBar/TopBar';
import ReportEvent from '../../../components/Report/ReportEvent';

class EventDetail extends Component {
  state = {
    modalBool: false,
  }

  componentDidMount() {
    this.props.onGetEvent(parseInt(this.props.match.params.event_id));

  }

  onClickBack = () => {
    this.props.history.goBack();
  }

  onClickModifyEvent = () => {
    this.props.history.push(`/details/modify/${this.props.event.id}/`);
  }

  /*
  onClickBringEvent = () => {

  }

  onClickLikeEvent = () => {

  }
  onClickDeleteEvent = () => {

  }
  */

  onClickReportEvent = () => {
    this.setState((prevState) => ({ modalBool: !prevState.modalBool }));
  }

  render() {
    let modal = null;
    if (this.state.modalBool) {
      modal = (
        <ReportEvent
          event={this.props.event}
          onClickCloseModal={() => this.setState({ modalBool: false })}
        />
      );
    }

    let eventLoaded;
    if (!(this.props.event.title?.length > 0)) eventLoaded = false;
    else eventLoaded = true;

    const eventTitle = (eventLoaded) ? this.props.event.title : '해당없음';
    const eventGroupName = (this.props.event.group?.name?.length>0) ? this.props.event.group.name : '해당없음';
    const eventPlace = (this.props.event.place?.length>0) ? this.props.event.place : '해당없음';
    const formattedDate = (eventLoaded) ? this.props.event.date : '해당없음';
    const categoryName = (this.props.event.category?.name?.length>0) ? this.props.event.category.name : '해당없음';
    const eventBeginTime = (eventLoaded) ? this.props.event.begin_time : '해당없음';
    const eventEndTime = (eventLoaded) ? this.props.event.end_time : '해당없음';
    const eventContent = (this.props.event.content?.length>0) ? this.props.event.content : '해당없음';
    const lastEditorName = (this.props.event.last_editor?.name?.length>0) ? this.props.event.last_editor.name : '해당없음';
    const lastEditorDepartment = (eventLoaded) ? this.props.event.last_editor.department : '해당없음';

    const lastEditor = (
      <div className="lastEditor">
        <div className="name">
          {lastEditorName}
        </div>
        <div className="major">
          {lastEditorDepartment}
        </div>
      </div>
    );

    return (
      <div className="EventDetail">

        <div className="topBar">
          <TopBar
            tabNum = {0}
            history={this.props.history}
          />
        </div>

        <h1>{eventTitle}</h1>

        <div className="container">

          <div className="btnBox">
            <div className="left">
              <button className="back" onClick={() => this.onClickBack()} style={{ width: 50 }}>
                Back
              </button>
            </div>

            <div className="right">
              <div className="btns">
                <button className="ModifyEvent" onClick={() => this.onClickModifyEvent()}>
                  <BiEditAlt size="100%" color="black" />
                </button>
                <button className="bringEvent" onClick={() => { }}>
                  <GoDiffAdded size="100%" color="black" />
                </button>
                <button className="likeEvent" onClick={() => { }}>
                  <GrLike size="100%" color="#fff" />
                </button>
                <button className="reportEvent" onClick={() => this.onClickReportEvent()}>
                  <GoReport size="100%" color="red" />
                </button>
              </div>
            </div>
          </div>

          <div className="detailBox">
            <div className="top">

              <div className="box">
                <div className="infoBox">
                  <div className="infoKey">제목</div>
                  <div className="infoValue">{eventTitle}</div>
                </div>
                <div className="infoBox">
                  <div className="infoKey">분류</div>
                  <div className="infoValue">{categoryName}</div>
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <div className="infoKey">단체</div>
                  <div className="infoValue">{eventGroupName}</div>
                </div>
                <div className="infoBox">
                  <div className="infoKey">장소</div>
                  <div className="infoValue">{eventPlace}</div>
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <div className="infoKey">일시</div>
                  <div className="infoValue">{formattedDate}</div>
                </div>
                <div className="infoBox">
                  <div className="infoKey">시간</div>
                  <div className="infoValue">
                    {eventBeginTime}
                    {' '}
                    ~
                    {' '}
                    {eventEndTime}
                  </div>
                </div>
              </div>

            </div>

            <div className="content">
              <div className="box">
                {eventContent}
              </div>
              <div className="box">
                이벤트 사진 업로드
              </div>
              <div className="box">
                태그
              </div>
            </div>
          </div>

          <div className="descriptionBox">
            <div className="key">
              마지막 수정
            </div>
            <div className="value">
              {lastEditor}
            </div>
          </div>
        </div>
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  //  signinedUser: state.ur.signinedUser,
  event: state.evt.target,
});

const mapDispatchToProps = (dispatch) => ({
  onGetEvent: (id) => dispatch(actionCreators.getEvent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
