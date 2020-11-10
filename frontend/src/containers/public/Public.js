import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import TopBar from '../../components/TopBar/TopBar';
import './Public.css';
import Calendar from '../../components/Calendar/Calendar';
import { createEventIcon } from '../../images/index';
import SideBar from '../../components/SideBar/SideBar';

function onClickCreateEvent() {
  // redirect to create event page
}

function onClickDay(day, events) {
  // show modal window
}

function onClickEvent(evt) {
  // redirect to event detail
}

class Public extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewOption: 'Calendar',
      including: '',
      tagOption: '',
      categoryOption: new Set(),
      groupOption: '',
      eventOption: null,
      sortOption: 'recent',
    };
    this.setViewOption = this.setViewOption.bind(this);
    this.setIncluding = this.setIncluding.bind(this);
    this.setTagOption = this.setTagOption.bind(this);
    this.setCategoryOption = this.setCategoryOption.bind(this);
    this.setGroupOption = this.setGroupOption.bind(this);
    this.setEventOption = this.setEventOption.bind(this);
    this.setSortOption = this.setSortOption.bind(this);
  }

  componentDidMount() {
    const { onGetAllEvent } = this.props;
    onGetAllEvent();
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

  render() {
    const { events } = this.props;
    return (
      <div className="Public">
        <div>
          <TopBar />
        </div>
        <Calendar
          events={events}
          onClickDay={onClickDay}
        />
        <button className="createEventButtonInCalendar" src={createEventIcon} label="createEvent" type="button" onClick={() => onClickCreateEvent()}>
          <img className="img" src={createEventIcon} alt="+" />
        </button>
        <SideBar
          setViewOption={this.setViewOption}
          setIncluding={this.setIncluding}
          setTagOption={this.setTagOption}
          setCategoryOption={this.setCategoryOption}
          setGroupOption={this.setGroupOption}
          setEventOption={this.setEventOption}
          setSortOption={this.setSortOption}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.evt.events,
});

const mapDispatchToProps = (dispatch) => ({
  onGetAllEvent: () => dispatch(actionCreators.getAllEvent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Public);
