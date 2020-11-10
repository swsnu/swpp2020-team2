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

    onClickBringEvent = (id) => {

    }

    onClickLikeEvent = (id) => {

    }

    onClickReportEvent = (id) => {

    }

    onClickDetailEvent = (id) => {

    }

    render() {
      const events = this.state.dayEventList?.map((event) => (
        <Event
          event={event}
          bringEvent={() => this.onClickBringEvent(event.id)}
          likeEvent={() => this.onClickLikeEvent(event.id)}
          reportEvent={() => this.onClickReportEvent(event.id)}
          detailEvent={() => this.onClickDetailEvent(event.id)}
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
                <button type="button" onClick={() => this.props.onClickCloseModal()}>X</button>
              </div>

              <div className="createEvent">
                <button type="button" onClick={() => this.props.onClickCreateEvent(this.props.day)}>
                  <GrTableAdd size="100%" />
                </button>
              </div>
            </div>
          </div>

          <div className="eventList">
            {events}
          </div>
        </div>
      );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EventListModal);
