import React, { Component } from 'react';
import format from 'date-fns/format';
import './EventListModal.css';
import { connect } from 'react-redux';

import { GrTableAdd } from 'react-icons/gr';
import * as actionCreators from '../../store/actions/index';

import Event from '../eventBox/EventBox';

class EventListModal extends Component {
  state = {
    NumEvents: 0,
    date: '',
    dayEventList: [],
  }

  componentDidMount() {
    const dateFormat = 'yyyy. MM. d. EEE';
    const formattedDate = format(this.props.day, dateFormat);
    this.setState({
      date: formattedDate,
      NumEvents: this.props.dayEventList.length,
      dayEventList: this.props.dayEventList,
    });
  }

  onClickDetailEvent = (id) => {
    this.props.history.push(`/details/${id}`);
  }

  render() {
    const events = this.state.dayEventList?.map((event) => (
      <Event
        key={event}
        event={event}
        bringEvent={() => this.props.onClickBringEvent(event.id)}
        likeEvent={() => this.props.onClickLikeEvent(event.id)}
        detailEvent={() => this.onClickDetailEvent(event.id)}
        likeBool={!!this.props.likeEventIDs?.includes(event.id)}
        bringBool={!!this.props.bringEventIDs?.includes(event.id)}
      />
    ));
    return (

      <div className="EventListModal">
        <div className="top">
          <div className="left">
            {this.state.date}
          </div>

          <div className="right">
            <div className="NumEvents">
              {this.state.NumEvents}
              {' '}
              events
            </div>

            <div className="createEvent">
              <button className="createEventButton" type="button" onClick={() => this.props.onClickCreateEvent(format((this.props.day), 'yyyy-MM-dd'))}>
                <GrTableAdd size="100%" />
              </button>
            </div>
            <div className="rightCorner">
              <button className="closeButton" type="button" onClick={() => this.props.onClickCloseModal()}>X</button>
            </div>
          </div>
        </div>

        <div className="eventList">
          <nav className="nav">
            {events}
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  likeEventIDs: state.ur.likeEvents,
  bringEventIDs: state.ur.bringEvents,
  loggedUser: state.ur.userFullInfo,
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(EventListModal);
