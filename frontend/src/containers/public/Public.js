import React, { useState, Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
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
      events: [],
      monthBegin: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
      monthEnd: format(endOfMonth(new Date()), 'yyyy-MM-dd'),
      currentDate: new Date(),
      modalBool: false,
      modalEvents: [],
      modalDay: null,
      viewOption: 'Calendar',
      including: '',
      tagOption: '',
      categoryOption: new Set(),
      groupOption: '',
      eventOption: '',
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

    this.getTagByName = async (name) => {
      try {
        return await axios.get(`/api/tag/name/${name}/`);
      } catch (error) {
        return console.error(error);
      }
    };

    this.getFilteredEvents = async (including, tagOption, categoryOption, groupOption, eventOption, sortOption, dateBegin, dateEnd) => {
      const includingArray = including.split(' ');
      const _including = includingArray;
      const categoryArray = Array.from(categoryOption);
      const _category = (categoryArray.length === 0) ? undefined : categoryArray;
      let _tag;
      if (tagOption !== '') {
        _tag = [];
        const tagPromise = [];
        const tagArray = tagOption.split(' ');
        for (var i = 0; i < tagArray.length; i += 1) {
          tagPromise.push(this.getTagByName(tagArray[i]));
        }
        await Promise.all(tagPromise).then((responses) => {
          responses.forEach((response) => {
            if (response !== undefined) _tag.push(response.data.id);
          });
        });
      }
      try {
        return await axios.post('/api/event/filtered/', {
          filter_options: {
            including: _including,
            tag: _tag,
            category: _category,
            group: [groupOption],
            event: [eventOption],
            date: {
              begin_date: dateBegin,
              end_date: dateEnd,
            },
          },
          sort_options: [sortOption],
          count_options: {},
        });
      } catch (error) {
        return console.error(error);
      }
    };

    this.filterEvents = async () => {
      const prevState = this.state;
      const _events = await this.getFilteredEvents(prevState.including, prevState.tagOption, prevState.categoryOption, prevState.groupOption, prevState.eventOption, prevState.sortOption, prevState.monthBegin, prevState.monthEnd);
      this.setState({
        events: _events.data,
      });
    };

    this.filterEvents();
  }

  componentDidMount() {
    this.props.onGetUser();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate() {
    if (this.props.signinedUser === null) this.props.history.replace('/');
  }

  onClickCreateEvent(date) {
    this.props.history.push({
      pathname: '/details/create/',
      state: { date },
    });
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
    }, () => this.filterEvents());
  }

  setTagOption(str) {
    this.setState({
      tagOption: str,
    }, () => this.filterEvents());
  }

  setCategoryOption(id) {
    this.setState((state) => {
      const categoryOption_ = state.categoryOption;
      if (categoryOption_.has(id)) categoryOption_.delete(id);
      else categoryOption_.add(id);
      return {
        categoryOption: categoryOption_,
      };
    }, () => this.filterEvents());
  }

  setGroupOption(str) {
    this.setState((state) => {
      if (str === state.groupOption) return { groupOption: '' };
      return { groupOption: str };
    }, () => this.filterEvents());
  }

  setEventOption(str) {
    this.setState((state) => {
      if (str === state.eventOption) return { eventOption: '' };
      return { eventOption: str };
    }, () => this.filterEvents());
  }

  setSortOption(str) {
    this.setState({
      sortOption: str,
    }, () => this.filterEvents());
  }

  nextMonth() {
    this.setState((prevState) => ({
      monthBegin: format(startOfMonth(addMonths(prevState.currentDate, 1)), 'yyyy-MM-dd'),
      monthEnd: format(endOfMonth(addMonths(prevState.currentDate, 1)), 'yyyy-MM-dd'),
      currentDate: addMonths(prevState.currentDate, 1),
    }), () => this.filterEvents());
  }

  prevMonth() {
    this.setState((prevState) => ({
      monthBegin: format(startOfMonth(subMonths(prevState.currentDate, 1)), 'yyyy-MM-dd'),
      monthEnd: format(endOfMonth(subMonths(prevState.currentDate, 1)), 'yyyy-MM-dd'),
      currentDate: subMonths(prevState.currentDate, 1),
    }), () => this.filterEvents());
  }

  render() {
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
          events={this.state.events}
          onClickDay={this.onClickDay}
        />
      );
    } else {
      view = (
        <ListView
          day={this.state.currentDate}
          history={this.props.history}
          monthEventList={this.state.events}
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
  signinedUser: state.ur.signinedUser,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(actionCreators.getUserFull()),
  // onBringEvent: (id, oper) => dispatch(actionCreators.bringEvent(id, oper)),
  // onLikeEvent: (id, oper) => dispatch(actionCreators.likeEvent(id, oper)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Public);
