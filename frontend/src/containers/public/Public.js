import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import TopBar from '../../components/TopBar/TopBar';
import './Public.css';
import Calendar from '../../components/Calendar/Calendar';
import { createEventIcon } from '../../images/index';

function onClickDate(day) {
  // console.log('click date');
}

function onClickCreateEvent() {
  // console.log('click create event');
}

class Public extends Component {
  componentDidMount() {
    const { onGetAllEvent } = this.props;
    onGetAllEvent();
  }

  render() {
    const { events } = this.props;
    return (
      <div className="Public">
        <div>
          <TopBar />
        </div>
        <div>
          <Calendar events={events} onClickDate={onClickDate} />
        </div>
        <button className="createEventButton" src={createEventIcon} label="createEvent" type="button" onClick={onClickCreateEvent}>
          <img className="img" src={createEventIcon} alt="+" />
        </button>
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
