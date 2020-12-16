import React, { Component } from 'react';
import format from 'date-fns/format';
import { connect } from 'react-redux';
import { MdRemoveShoppingCart, MdAddShoppingCart } from 'react-icons/md';

import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

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

  onClickBringEvent = (id) => {
    if (this.props.bringEventIDs?.includes(id)) this.props.onBringEvent(id, 'remove');
    else this.props.onBringEvent(id, 'add');
  }

  onClickLikeEvent = (id) => {
    if (this.props.likeEventIDs?.includes(id)) this.props.onLikeEvent(id, 'remove');
    else this.props.onLikeEvent(id, 'add');
  }

  /*
  onClickDeleteEvent = () => {

  }
  */

  onClickReportEvent = () => {
    this.setState((prevState) => ({ modalBool: !prevState.modalBool }));
  }

  render() {
    const likeBool = !!this.props.likeEventIDs?.includes(this.props.event.id);
    const bringBool = !!this.props.bringEventIDs?.includes(this.props.event.id);

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
    const eventGroupName = (this.props.event.group?.name?.length > 0) ? this.props.event.group.name : '해당없음';
    const eventPlace = (this.props.event.place?.length > 0) ? this.props.event.place : '해당없음';
    const formattedDate = (eventLoaded) ? this.props.event.date : '해당없음';
    const categoryName = (this.props.event.category?.name?.length > 0) ? this.props.event.category.name : '해당없음';
    const eventBeginTime = (eventLoaded) ? this.props.event.begin_time : '해당없음';
    const eventEndTime = (eventLoaded) ? this.props.event.end_time : '해당없음';
    const eventContent = (this.props.event.content?.length > 0) ? this.props.event.content : '해당없음';
    const lastEditorName = (this.props.event.last_editor?.name?.length > 0) ? this.props.event.last_editor.name : '해당없음';
    const lastEditorDepartment = (eventLoaded) ? this.props.event.last_editor.department : '해당없음';
    const imageUrl = (eventLoaded) ? this.props.event?.image[0].image_file_url : "";
    const tags = (eventLoaded) ? this.props.event.tag : [];

    const categoryColor = !(this.props.event.category?.name?.length > 0) ? "gray" : 
                      this.props.event.category.id === 1 ? 'red'
                      : this.props.event.category.id === 2 ? 'orange'
                        : this.props.event.category.id === 3 ? 'yellow'
                          : this.props.event.category.id === 4 ? 'green'
                            : this.props.event.category.id === 5 ? 'skyblue'
                              : this.props.event.category.id === 6 ? 'blue'
                                : this.props.event.category.id === 7 ? 'purple'
                                  : 'gray';

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
            tabNum={0}
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
                <button className="bringEvent" onClick={() => this.onClickBringEvent(this.props.event.id)}>
                  {bringBool ? <MdRemoveShoppingCart size="100%" /> : <MdAddShoppingCart size="100%" />}
                </button>
                <button className="likeEvent" onClick={() => this.onClickLikeEvent(this.props.event.id)}>
                  {likeBool ? <FcLike size="100%" /> : <FcLikePlaceholder size="100%" />}
                </button>
                <button className="reportEvent" onClick={() => this.onClickReportEvent()}>
                  <GoReport size="100%" color="red" />
                </button>
              </div>
            </div>
          </div>

          <div className="detailBox">

            <div className="box">
              <div className="infoBox">
                <div className="infoKey">제목</div>
                <div className="infoValue">{eventTitle}</div>
              </div>
              <div className="infoBox">
                <div className="infoKey">분류</div>
                <div className="infoValue" style={{color: categoryColor, fontWeight:"bold"}}>{categoryName}</div>
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

            <div className="box large">
              <div className="infoBox">
                <div className="infoKey">내용</div>
                <div className="infoValue">{eventContent}</div>
              </div>
            </div>

            <div className="box large">
              <div className="infoBox">
                <div className="infoKey">사진</div>
                <div className="infoValue">
                  <img src={"/media/" + imageUrl} alt="event Image" />
                </div>
              </div>
            </div>

            <div className="box large">
              <div className="infoBox">
                <div className="infoKey">태그</div>
                <div className="infoValue">
                  <div className="tag" style={{color: categoryColor, fontWeight:"bold"}}># {categoryName}</div>
                  {tags.map((tag) => {
                    return (
                      <div className="tag" style={{color: categoryColor, fontWeight:"bold"}}>
                        # {tag.name}
                      </div>
                    )
                  })}
                </div>
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
  likeEventIDs: state.ur.likeEvents,
  bringEventIDs: state.ur.bringEvents,
  loggedUser: state.ur.userFullInfo,
  event: state.evt.target,
});

const mapDispatchToProps = (dispatch) => ({
  onGetEvent: (id) => dispatch(actionCreators.getEvent(id)),
  onBringEvent: (id, oper) => dispatch(actionCreators.bringEvent(id, oper)),
  onLikeEvent: (id, oper) => dispatch(actionCreators.likeEvent(id, oper)),
  // onGetUser: () => dispatch(actionCreators.getUserFull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);
