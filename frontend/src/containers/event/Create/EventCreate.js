import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';
import './EventCreate.css';

import TopBar from '../../../components/TopBar/TopBar';

class EventCreate extends Component {
  state = {
    title: '',
    category: null,
    group: '',
    place: '',
    begin_time: {},
    end_time: {},
    content: '',
    tags: [],
    selectTags: [],
  }

  componentDidMount() {
    this.props.getUserId();
    this.props.getCategories();
    this.props.getMyGroup();
  }

  componentDidUpdate(prevProps) {
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

  uploadImageHandler(e) {
    const formData = new FormData();
    formData.append('imagefile', e.target.files[0]);
    this.props.onCraeteImage(formData);
  }

  onClickAddTag = () => {
    if (this.state.content.length > 0) {
      this.props.onGetTagRecommend(this.state.content); // content에 맞는 tag 추천
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

  createEventHandler = () => {
    let message = '';
    if (!(this.state.title?.length > 0)) message += ' 행사 제목을 입력하세요 ! \n';
    if (!(this.state.category?.length > 0)) message += ' 행사 종류를 선택하세요 ! \n';
    if (!(this.state.group?.length > 0)) message += ' 행사 단체를 입력하세요 ! \n';

    if (message.length > 0) alert(message);
    else {
      this.props.onPostEvent({
        title: this.state.title,
        place: this.state.place,
        date: this.props.location.state.date,
        category: this.state.category,
        tag: this.state.tags,
        group: this.state.group,
        begin_time: `${this.state.begin_time}:00`,
        end_time: `${this.state.end_time}:00`,
        last_editor: this.props.signinedUser,
        image: this.props.selectedImage.map((item) => item.id),
        content: this.state.content,
      });
      this.props.history.replace('/public');
    }
  }

  onClickBack = () => {
    this.props.history.goBack();
  }

  uploadImageHandler(e) {
    const formData = new FormData();
    formData.append('imagefile', e.target.files[0]);
    this.props.onCraeteImage(formData);
  }

  render() {
    var makeOption = function func(X) {
      return <option value={X.id}>{X.name}</option>;
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
                    placeholder="행사제목입력"
                  />
                </div>

                <div className="infoBox">
                  <label className="infoKey">분류</label>
                  <select className="event-category-input" onChange={(event) => this.setState({ category: event.target.value })}>
                    <option value={null}>--select category--</option>
                    {this.props.categories.map(makeOption)}
                  </select>
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">단체</label>
                  <select className="event-group-input" onChange={(event) => this.setState({ group: event.target.value })}>
                    <option>--select group--</option>
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
                    placeholder="행사장소입력"
                  />
                </div>
              </div>

              <div className="box">
                <div className="infoBox">
                  <label className="infoKey">일시</label>
                  <div className="text">
                    {this.props.location.state.date}
                  </div>
                </div>

                <div className="infoBox">
                  <label className="infoKey">시간</label>
                  <select className="event-begin_time-input" onChange={(event) => this.setState({ begin_time: event.target.value })}>
                    <option>--select start time--</option>
                    {this.timeRange().map((item) => <option value={item}>{item}</option>)}
                  </select>

                  <select className="event-end_time-input" onChange={(event) => this.setState({ end_time: event.target.value })}>
                    <option>--select end time--</option>
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
                  placeholder="내용을 입력하세요"

                />
              </div>
              <div className="box">
                <label>사진 업로드</label>
                <input className="uploadImage" type="file" name="file" onChange={(e) => this.uploadImageHandler(e)} />
              </div>
              <div className="box">
                <button className="addTag" onClick={() => this.onClickAddTag()}>#태그 추가</button>
                {this.state.tags.map((tag) => (
                  <div
                    className={`tag ${this.state.selectTags.includes(tag.id)}` ? 'UnSelected' : 'Selected'}
                    onClick={() => this.onClickTag(tag.id)}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="confirmBox">
            <button
              className="confirm-create-event-button"
              onClick={() => this.createEventHandler()}
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
  myGroups: state.gr.myGroups,

  selectedImage: state.evt.selectedImage,
  tagRecommend: state.evt.tagRecommend,
});

const mapDispatchToProps = (dispatch) => ({
  getUserId: () => dispatch(actionCreators.getUser()),
  getCategories: () => dispatch(actionCreators.getCategories()),
  onPostEvent: (event) => dispatch(actionCreators.createEvent(event)),
  getMyGroup: () => dispatch(actionCreators.getMyGroup()),
  onCraeteImage: (dictImg) => dispatch(actionCreators.uploadImage(dictImg)),
  onGetTagRecommend: (content) => dispatch(actionCreators.getTagRecommend(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCreate);
