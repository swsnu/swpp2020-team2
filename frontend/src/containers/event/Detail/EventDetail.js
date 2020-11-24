import React, { Component, Text } from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';

import { GoDiffAdded, GoReport } from 'react-icons/go';

import { GrLike } from 'react-icons/gr';

import * as actionCreators from '../../../store/actions/index';
import './EventDetail.css';

import TopBar from '../../../components/TopBar/TopBar';

class EventDetail extends Component {
  componentDidMount() {
    this.props.onGetEvent(parseInt(this.props.match.params.event_id));
  }

  onClickBack = () => {
    this.props.history.goBack();
  }

  /*
  onClickEditEvent = () => {
    this.props.history.push(`/details/modify/${this.state.event.id}/`);
  }

  onClickBringEvent = () => {

  }

  onClickLikeEvent = () => {

  }

  onClickReportEvent = () => {

  }

  onClickDeleteEvent = () => {

  }
  */

  render() {
    const lastEditor = (
      <div className="lastEditor">
        <div className="name">
          래건
        </div>
        <div className="major">
          컴퓨터공학부
        </div>
      </div>
    );
    let eventLoaded;
    if (this.props.event === '' || this.props.event == null || this.props.event === undefined) eventLoaded = false;
    else if (this.props.event != null && typeof this.props.event === 'object' && !Object.keys(this.props.event).length) eventLoaded = false;
    else eventLoaded = true;

    const eventTitle = (eventLoaded) ? this.props.event.title : '';
    const eventGroup = (eventLoaded) ? this.props.event.group : '';
    const eventPlace = (eventLoaded) ? this.props.event.place : '';
    const formattedDate = (eventLoaded) ? format(this.props.event.date, 'yyyy. MM. dd') : '';
    const categoryName = (eventLoaded) ? this.props.event.category.name : '';
    const eventBeginTime = (eventLoaded) ? this.props.event.begin_time : '';
    const eventEndTime = (eventLoaded) ? this.props.event.end_time : '';
    const eventContent = (eventLoaded) ? this.props.event.content : '';

    return (
      <div className="EventDetail">

        <div className="topBar">
          <TopBar
            history={this.props.history}
          />
        </div>

        <h1>EventDetail</h1>

        <div className="container">

          <div className="btnBox">
            <div className="left">
              <button className="back" onClick={() => this.onClickBack()} style={{ width: 50 }}>
                Back
              </button>
            </div>

            <div className="right">
              <div className="btns">
                <button className="bringEvent" onClick={() => {}}>
                  <GoDiffAdded size="100%" color="black" />
                </button>
                <button className="likeEvent" onClick={() => {}}>
                  <GrLike size="100%" color="#fff" />
                </button>
                <button className="reportEvent" onClick={() => {}}>
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
                  <div className="infoValue">{eventGroup}</div>
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
