import React, { Component } from 'react';
import format from 'date-fns/format';
import './ListView.css';
import { connect } from 'react-redux';

import { GrTableAdd } from 'react-icons/gr';
import * as actionCreators from '../../store/actions/index';

import Event from '../eventBox/EventBox';

const ListView = ({ day, monthEventList, history, onClickCreateEvent }) => {
  const NumEvents = (monthEventList === undefined) ? 0 : monthEventList.length;
  const dateFormat = 'yyyy. MM.';
  const date = format(day, dateFormat);

  const onClickDetailEvent = (id) => {
    history.push(`/details/${id}`);
  };

  const events = monthEventList?.map((event) => (
    <Event
      event={event}
      bringEvent={() => {}}// this.onClickBringEvent(event.id)}
      likeEvent={() => {}}// this.onClickLikeEvent(event.id)}
      reportEvent={() => {}}// this.onClickReportEvent(event.id)}
      detailEvent={() => onClickDetailEvent(event.id)}
    />
  ));

  return (
    <div className="ListView">
      <div className="top">
        <div className="left">
          {date}
        </div>

        <div className="right">
          <div className="NumEvents">
            {NumEvents}
            {' '}
            events
          </div>

          <div className="createEvent">
            <button className="createEventButton" type="button" onClick={() => onClickCreateEvent(day)}>
              <GrTableAdd size="100%" />
            </button>
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
};
/*
const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});
*/
export default ListView;
