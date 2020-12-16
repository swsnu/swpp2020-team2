import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import './EventModify.css';

import TopBar from '../../../components/TopBar/TopBar';

class EventModify extends Component {
  state = {
    title: '',
    category: null,
    group: '',
    place: '',
    begin_time: '',
    end_time: '',
    content: '',
    tags: [],
    selectTags: [],
    date: '',
  }

  componentDidMount() {
    this.props.onGetEvent(parseInt(this.props.match.params.event_id));

    this.props.getUserId();
    this.props.getCategories();
    this.props.getMyGroup();

    this.setState({
      title: this.props.event.title,
      category: this.props.event.category.id,
      group: this.props.event.group.id,
      place: this.props.event.place,
      begin_time: this.props.event.begin_time,
      end_time: this.props.event.end_time,
      content: this.props.event.content,
      tags: this.props.event.tag,
      selectTags: this.props.event.tag,
      date: this.props.event.date
    })
  }
  componentDidUpdate(prevProps){
    if(this.props.event !== prevProps.event){
      this.setState({
        title: this.props.event.title,
        category: this.props.event.category.id,
        group: this.props.event.group.id,
        place: this.props.event.place,
        begin_time: this.props.event.begin_time,
        end_time: this.props.event.end_time,
        content: this.props.event.content,
        tags: this.props.event.tag,
        selectTags: this.props.event.tag,
        date: this.props.event.date
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //  if (!this.props.signinedUser) this.props.history.replace('/main');
    if (this.props.tagRecommend !== prevProps.tagRecommend) {
      this.setState({ tags: this.props.tagRecommend });
    }
  }

  timeRange = () => {
    const timeRange = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        timeRange.push(`0${i}:00`);
        timeRange.push(`0${i}:30`);
      } else {
        timeRange.push(`${i}:00`);
        timeRange.push(`${i}:30`);
      }
    }
    return timeRange;
  }

  onClickAddTag = () => {
    if (this.state.content.length > 0) {
      this.props.onGetTagRecommend(this.state.content); // content에 맞는 tag 추천
      this.setState({ selectTags: [] })
    } else alert('행사 내용을 입력하세요 !');
  }

  onClickTag = (id) => {
    if (this.state.selectTags?.includes(id)) {
      let removedTags = [];
      removedTags = this.state.selectTags?.filter((selectId) => selectId !== id);
      this.setState({ selectTags: removedTags });
    } else {
      this.setState({ selectTags: [...this.state.selectTags, id] });
    }
  }

  deleteEventHandler = () =>{
    this.props.onDeleteEvent(this.props.match.params.event_id)
    this.props.history.replace('/public');
  }

  modifyEventHandler = () => {
    let message = '';
    if (!(this.state.title?.length > 0)) message += ' 행사 제목을 입력하세요 ! \n';
    if (!(this.state.category > 0)) message += ' 행사 종류를 선택하세요 ! \n';
    if (!(this.state.group > 0)) message += ' 행사 단체를 입력하세요 ! \n';
    if (!(this.state.begin_time?.length > 0)) message += ' 행사 시작시간을 입력하세요 ! \n';
    if (!(this.state.end_time?.length > 0)) message += ' 행사 시작시간을 입력하세요 ! \n';

    if (message.length > 0) alert(message);
    else {
      this.props.onModifyEvent({
        id: this.props.match.params.event_id,
        title: this.state.title,
        place: this.state.place,
        date: this.state.date,
        category: this.state.category,
        tag: this.state.selectTags,
        group: this.state.group,
        begin_time: `${this.state.begin_time}:00`,
        end_time: `${this.state.end_time}:00`,
        last_editor: this.props.signinedUser,
        content: this.state.content,
      });
      this.props.history.replace('/public');
    }
  }

  onClickBack = () => {
    this.props.history.goBack();
  }

  render() {

    const imageUrl = this.props.event?.image[0]?.image_file_url;


    var makeOption = function func(X) {
      return <option value={X.id}>{X.name}</option>;
    };

    return (
      <div className="EventModify">
        <div className="topBar">
          <TopBar history={this.props.history} tabNum={0}/>
        </div>

        <h1>{this.state.title}</h1>

        <div className="container">

          <div className="btnBox">
            <div className="left">
              <button className="back" onClick={() => this.onClickBack()} style={{ width: 50 }}>
                Back
              </button>
            </div>
          </div>

          <div className="modifyBox">
            <div className="top">

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">제목</label>
                  <input
                    className="event-title-input"
                    type="text"
                    value={this.state.title}
                    onChange={(event) => this.setState({ title: event.target.value })}
                  />
                </div>

                <div className="infoBox">
                  <label className="infoKey">분류</label>
                  <select className="event-category-input" onChange={(event) => this.setState({ category: event.target.value })}>
                    <option value={this.props.event?.category?.id}>{this.props.event?.category?.name}</option>
                    {this.props.categories.map(makeOption)}
                  </select>
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">단체</label>
                  <select className="event-group-input" onChange={(event) => this.setState({ group: event.target.value })}>
                    <option value={this.props.event?.group?.id}>{this.props.event?.group?.name}</option>
                    {this.props.myGroups.map(makeOption)}
                  </select>
                </div>
                <div className="infoBox">
                  <label className="infoKey">장소</label>
                  <input
                    className="event-place-input"
                    type="text"
                    value={this.state.place}
                    onChange={(event) => this.setState({ place: event.target.value })}
                  />
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">일시</label>
                  <div className="text">
                    {this.state.date}
                  </div>
                </div>

                <div className="infoBox">
                  <label className="infoKey">시간</label>
                  <select className="event-begin_time-input" onChange={(event) => this.setState({ begin_time: event.target.value })}>
                    <option value={this.props.event?.begin_time}>{this.props.event?.begin_time}</option>
                    {this.timeRange().map((item) => <option value={item}>{item}</option>)}
                  </select>

                  <select className="event-end_time-input" onChange={(event) => this.setState({ end_time: event.target.value })}>
                    <option value={this.props.event?.end_time}>{this.props.event?.end_time}</option>
                    {this.timeRange().map((item) => <option value={item}>{item}</option>)}
                  </select>
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
                />
              </div>

              <div className="box">
                <label>사진</label>
                <img src={"http://ec2-100-25-237-244.compute-1.amazonaws.com:8000/api" + imageUrl} alt="event Image" style={{maxWidth:'80%', maxHeight:'80%',padding:10}} />
              </div>

              <div className="box">
                <button className="addTag" onClick={() => this.onClickAddTag()}>태그 추천</button>
                {this.state.tags?.map((tag) => (
                  <div
                    className={`tag ${this.state.selectTags.includes(tag.id) ? 'Selected' : 'UnSelected'}`}
                    onClick={() => this.onClickTag(tag.id)}
                  >
                    # {tag.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="confirmBox">
            <button
              className="confirm-modify-event-button"
              onClick={() => this.modifyEventHandler()}
            >
              Modify
            </button>
            <button
              className="delete-event-button"
              onClick={() => this.deleteEventHandler()}
            >
              Delete
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
  myGroups: state.gr.myGroups,

  selectedImage: state.evt.selectedImage,
  tagRecommend: state.evt.tagRecommend,

  event: state.evt.target,
});

const mapDispatchToProps = (dispatch) => ({
  getUserId: () => dispatch(actionCreators.getUser()),
  getCategories: () => dispatch(actionCreators.getCategories()),
  getMyGroup: () => dispatch(actionCreators.getMyGroup()),
  onGetEvent: (id) => dispatch(actionCreators.getEvent(id)),

  onCraeteImage: (dictImg) => dispatch(actionCreators.uploadImage(dictImg)),
  onGetTagRecommend: (content) => dispatch(actionCreators.getTagRecommend(content)),

  onModifyEvent: (event) => dispatch(actionCreators.modifyEvent(event)),
  onDeleteEvent: (id) => dispatch(actionCreators.deleteEvent(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventModify);
