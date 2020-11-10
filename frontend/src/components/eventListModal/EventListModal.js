import React, { Component } from 'react';

import './EventListModal.css';
import { connect } from 'react-redux';

import { GrTableAdd } from 'react-icons/gr';
import * as actionCreators from '../../store/actions/index';

import Event from '../eventBox/EventBox';

class EventListModal extends Component {
    state = {
      NumEvents: 0,
      date: '2020. 09. 12. SAT',
      dayEventList: [{
        id: 1,
        title: 'title',
        group: 'group',
        place: 'place',
        begin_time: 'begin_time',
        end_time: 'end_time',
        category: 'festival',
      }],
    }

    componentDidMount() {
      if (this.props.dayEventList?.length() > 0) {
        this.setState({ NumEvents: this.props.dayEventList.length(), dayEventList: this.props.dayEventList });
      }
    }

    onClickCreateEvent = (date) => {

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
              </div>

              <div className="createEvent">
                <button onClick={() => this.onClickCreateEvent(this.props.date)}>
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
