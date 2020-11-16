import React from 'react';
import { GoDiffAdded, GoReport } from 'react-icons/go';

import { GrLike } from 'react-icons/gr';

import './EventBox.css';

const EventBox = (props) => (
  <div
    className="EventBox"
    style={{
      borderLeftColor: props.event?.category.id == 0 ? 'red'
        : props.event?.category.id == 1 ? 'orange'
          : props.event?.category.id == 2 ? 'yellow'
            : props.event?.category.id == 3 ? 'green'
              : props.event?.category.id == 4 ? 'skyblue'
                : props.event?.category.id == 5 ? 'blue'
                  : props.event?.category.id == 6 ? 'purple'
                    : 'gray',
    }}
  >
    <div className="left">
      <div className="top">
        <div className="group">
          {props.event?.group}
        </div>
      </div>

      <div className="middle">
        <button className="title" onClick={() => { props.detailEvent(props.event?.id); }}>
          {props.event?.title}
        </button>
      </div>

      <div className="bottom">
        <div className="place">
          {props.event?.place}
        </div>
        <div className="time">
          {props.event?.begin_time}
          {' '}
          ~
          {props.event?.end_time}
        </div>
      </div>
    </div>

    <div className="right">
      <div className="btns">
        <button className="bringEvent" onClick={props.bringEvent}>
          <GoDiffAdded size="100%" color="black" />
        </button>
        <button className="likeEvent" onClick={props.likeEvent}>
          <GrLike size="100%" color="#fff" />
        </button>
        <button className="reportEvent" onClick={props.reportEvent}>
          <GoReport size="100%" color="red" />
        </button>
      </div>

      <div className="tags">
        tags
      </div>
    </div>

  </div>
);

export default EventBox;
