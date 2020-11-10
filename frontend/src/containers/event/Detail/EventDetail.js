import React, { Component, Text } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import './EventDetail.css';

import { GoDiffAdded, GoReport } from 'react-icons/go';

import { GrLike } from 'react-icons/gr';

class EventDetail extends Component {
  state = {
    event: {
      id: 1,
      title: '',
      category: '',
      group: '',
      place: '',
      date: '',
      begin_time: '해당없음',
      end_time: '해당없음',
      content: '내용',
    },
  }
  /*
  componentDidMount(){
    this.props.onGetEvent(parseInt(this.props.match.params.id));
  }
  */

  onClickBack = () => {
    this.props.history.goBack();
  }

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

    return (
      <div className="EventDetail">
        <h1>EventDetail</h1>
        <div className="topBar" />

        <div className="container">

          <div className="btnBox">
            <div className="left">
              <button className="back" onClick={() => this.onClickBack()} style={{ width: 50 }}>
                Back
              </button>
            </div>

            <div className="right">
              <div className="btns">
                <button className="bringEvent" onClick={() => this.onClickBringEvent()}>
                  <GoDiffAdded size="100%" color="black" />
                </button>
                <button className="likeEvent" onClick={() => this.onClickLikeEvent()}>
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
                  <div className="infoValue">{this.state.event.title}</div>
                </div>
                <div className="infoBox">
                  <div className="infoKey">분류</div>
                  <div className="infoValue">{this.state.event.category}</div>
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <div className="infoKey">단체</div>
                  <div className="infoValue">{this.state.event.group}</div>
                </div>
                <div className="infoBox">
                  <div className="infoKey">장소</div>
                  <div className="infoValue">{this.state.event.space}</div>
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <div className="infoKey">일시</div>
                  <div className="infoValue">{this.state.event.date}</div>
                </div>
                <div className="infoBox">
                  <div className="infoKey">시간</div>
                  <div className="infoValue">
                    {this.state.event.begin_time}
                    {' '}
                    ~
                    {' '}
                    {this.state.event.end_time}
                  </div>
                </div>
              </div>

            </div>

            <div className="content">
              <div className="box">
                {this.state.event.content}
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
  signinedUser: state.ur.signinedUser,

});

const mapDispatchToProps = (dispatch) => ({
  onGetEvent: (id) => dispatch(actionCreators.getEvent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
