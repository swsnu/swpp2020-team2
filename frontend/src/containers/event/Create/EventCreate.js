import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ImCalendar } from 'react-icons/im';

import * as actionCreators from '../../../store/actions/index';
import './EventCreate.css';

import TopBar from '../../../components/TopBar/TopBar';

class EventCreate extends Component {
  state = {
    title: '',
    category: null,
    group: null,
    place: '',
    date: null,
    begin_time: '',
    end_time: '',
    content: '',
  }

  componentDidMount() {
    this.props.getUserFull();
    this.props.getCategories();
  }

  componentDidUpdate(prevProps) {
    if (!this.props.signinedUser) this.props.history.replace('/main');
  }

  createEventHandler = () => {
    this.props.createEvent({
      title: this.state.title,
      place: this.state.place,
      date: this.state.date,
      category: this.state.category,
      // tag:args.tag,
      group: this.state.group,
      begin_time: this.state.begin_time,
      end_time: this.state.end_time,
      last_editor: this.state.signinedUser,
      // image:args.image,
      content: this.state.content,
    });
  }

  onClickBack = () => {
    this.props.history.goBack();
  }

  render() {
    const disablebtn = this.state.title === '' || !this.state.category || !this.state.group || !this.state.date;

    var makeCategoryOption = function (cat) {
      return <option value={cat.id}>{cat.name}</option>;
    };

    return (
      <div className="EventCreate">
        <div className="topBar">
          <TopBar history={this.props.history} />
        </div>

        <h1>EventCreate</h1>

        <div className="container">

          <div className="btnBox">
            <div className="left">
              <button className="back" onClick={() => this.onClickBack()} style={{ width: 50 }}>
                Back
              </button>
            </div>
          </div>

          <div className="createBox">
            <div className="top">

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">제목</label>
                  <input
                    className="event-title-input"
                    type="text"
                    value={this.state.title}
                    onChange={(event) => this.setState({ title: event.target.value })}
                    placeholder="행사제목"
                  />
                </div>

                <div className="infoBox">
                  <label className="infoKey">분류</label>
                  <select className="event-category-input" onChange={(event) => this.setState({ category: event.target.value })}>
                    <option value={null}>--select category--</option>
                    {this.props.categories.map(makeCategoryOption)}
                  </select>
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">단체</label>
                  <select className="event-group-input" onChange={() => {}}>
                    <option>--단체를 선택하세요--</option>
                    <option>단풍</option>
                    <option>UPnL</option>
                    <option>Zero</option>
                  </select>
                </div>
                <div className="infoBox">
                  <label className="infoKey">장소</label>
                  <input
                    className="event-place-input"
                    type="text"
                    value={this.state.place}
                    onChange={(event) => this.setState({ place: event.target.value })}
                    placeholder="행사장소"
                  />
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">일시</label>
                  <button className="event-date-input" onClick={() => {}}>
                    <ImCalendar color="black" />
                  </button>
                  <input className="event-year-input" type="text" style={{ width: 40, textAlign: 'right' }} />
                  &nbsp;.&nbsp;
                  <input className="event-month-input" type="text" style={{ width: 20, textAlign: 'right' }} />
                  &nbsp;.&nbsp;
                  <input className="event-day-input" type="text" style={{ width: 20, textAlign: 'right' }} />
                </div>
                <div className="infoBox">
                  <label className="infoKey">시간</label>
                  <input
                    className="event-begin_time-input"
                    type="text"
                    value={this.state.begin_time}
                    onChange={(event) => this.setState({ begin_time: event.target.value })}
                    placeholder="시작시간"
                  />
                  <input
                    className="event-end_time-input"
                    type="text"
                    value={this.state.end_time}
                    onChange={(event) => this.setState({ end_time: event.target.value })}
                    placeholder="종료시간"
                  />
                </div>
              </div>

            </div>

            <div className="content">
              <div className="box">
                <textarea
                  className="event-content-input"
                  type="text"
                  rows="4"
                  value={this.state.content}
                  onChange={(event) => this.setState({ content: event.target.value })}
                  placeholder="내용을 입력하세요"

                />
              </div>
              <div className="box">
                <button className="uploadImage" onClick={() => {}}>사진 업로드</button>
              </div>
              <div className="box">
                <button className="addTag" onClick={() => {}}>#태그 추가</button>
              </div>
            </div>
          </div>

          <div className="confirmBox">
            <button
              className="confirm-create-event-button"
              onClick={() => this.createEventHandler()}
              disabled={disablebtn}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  categories: state.or.categories,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
  getCategories: () => dispatch(actionCreators.getCategories()),
  createEvent: (args) => dispatch(actionCreators.createEvent(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
