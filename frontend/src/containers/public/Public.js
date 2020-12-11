import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import * as actionCreators from '../../store/actions/index';
import TopBar from '../../components/TopBar/TopBar';
import './Public.css';
import Calendar from '../../components/Calendar/Calendar';
import ListView from '../../components/ListView/ListView';
import { createEventIcon } from '../../images/index';
import SideBar from '../../components/SideBar/SideBar';
import EventListModal from '../../components/eventListModal/EventListModal';

class Public extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      modalBool: false,
      modalEvents: [],
      modalDay: null,
      viewOption: 'Calendar',
      including: '',
      tagOption: '',
      categoryOption: new Set(),
      groupOption: '',
      eventOption: null,
      sortOption: 'recent',
    };
    this.onClickDay = this.onClickDay.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.onClickCreateEvent = this.onClickCreateEvent.bind(this);
    this.setViewOption = this.setViewOption.bind(this);
    this.setIncluding = this.setIncluding.bind(this);
    this.setTagOption = this.setTagOption.bind(this);
    this.setCategoryOption = this.setCategoryOption.bind(this);
    this.setGroupOption = this.setGroupOption.bind(this);
    this.setEventOption = this.setEventOption.bind(this);
    this.setSortOption = this.setSortOption.bind(this);
  }

  componentDidMount() {
    this.props.onGetAllEvent();
    this.props.onGetUser();
  }

  componentDidUpdate() {
    if (this.props.signinedUser==null) this.props.history.replace('/');
  }

  onClickCreateEvent() {
    this.props.history.push('/details/create');
  }

  onClickDay(day, events) {
    // show modal window
    this.setState({
      modalBool: true,
      modalEvents: events,
      modalDay: day,
    });
  }

  onClickCloseModal() {
    this.setState({
      modalBool: false,
    });
  }

  setViewOption(str) {
    this.setState({
      viewOption: str,
    });
  }

  setIncluding(str) {
    this.setState({
      including: str,
    });
  }

  setTagOption(str) {
    this.setState({
      tagOption: str,
    });
  }

  setCategoryOption(id) {
    this.setState((state) => {
      const categoryOption_ = state.categoryOption;
      if (categoryOption_.has(id)) categoryOption_.delete(id);
      else categoryOption_.add(id);
      return {
        categoryOption: categoryOption_,
      };
    });
  }

  setGroupOption(str) {
    this.setState((state) => {
      if (str === state.groupOption) return { groupOption: '' };
      return { groupOption: str };
    });
  }

  setEventOption(str) {
    this.setState((state) => {
      if (str === state.eventOption) return { eventOption: '' };
      return { eventOption: str };
    });
  }

  setSortOption(str) {
    this.setState({
      sortOption: str,
    });
  }

  nextMonth() {
    this.setState((prevState) => ({ currentDate: addMonths(prevState.currentDate, 1) }));
  }

  prevMonth() {
    this.setState((prevState) => ({ currentDate: subMonths(prevState.currentDate, 1) }));
  }

  render() {
    const { events } = this.props;

    const dateFormat = 'yyyy. MM.';
    const header = (
      <div className="header">
        <div className="arrow" onClick={() => this.prevMonth()} onKeyPress={() => this.prevMonth()} role="button" tabIndex="-1">
          {'<'}
        </div>
        <div className="year_month">
          <span>{format(this.state.currentDate, dateFormat)}</span>
        </div>
        <div className="arrow" onClick={() => this.nextMonth()} onKeyPress={() => this.nextMonth()} role="button" tabIndex="-1">
          {'>'}
        </div>
      </div>
    );

    let view = null;
    if (this.state.viewOption === 'Calendar') {
      view = (
        <Calendar
          currentDate={this.state.currentDate}
          events={events}
          onClickDay={this.onClickDay}
        />
      );
    } else {
      view = (
        <ListView
          day={this.state.currentDate}
          history={this.props.history}
          monthEventList={events}
          onClickCreateEvent={this.onClickCreateEvent}
        />
      );
    }

    let modal = null;
    if (this.state.modalBool) {
      modal = (
        <EventListModal
          day={this.state.modalDay}
          dayEventList={this.state.modalEvents}
          onClickCloseModal={this.onClickCloseModal}
          onClickCreateEvent={this.onClickCreateEvent}
          history={this.props.history}
        />
      );
    }

    return (
      <div className="Public">
        <div>
          <TopBar
            tabNum={0}
            history={this.props.history}
          />
        </div>
        {header}
        {view}
        <SideBar
          setViewOption={this.setViewOption}
          setIncluding={this.setIncluding}
          setTagOption={this.setTagOption}
          setCategoryOption={this.setCategoryOption}
          setGroupOption={this.setGroupOption}
          setEventOption={this.setEventOption}
          setSortOption={this.setSortOption}
          selectedState={this.state}
        />
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.evt.events,
  loggedUser: state.ur.userFullInfo,
  signinedUser:state.ur.signinedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAllEvent: () => dispatch(actionCreators.getAllEvent()),
  onGetUser: () => dispatch(actionCreators.getUserFull()),
  onBringEvent: (id, oper) => dispatch(actionCreators.bringEvent(id, oper)),
  onLikeEvent: (id, oper) => dispatch(actionCreators.likeEvent(id, oper)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Public);
