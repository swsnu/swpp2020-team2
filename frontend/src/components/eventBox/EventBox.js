import React from 'react';
import { MdRemoveShoppingCart, MdAddShoppingCart } from 'react-icons/md';

import { FcLike, FcLikePlaceholder } from 'react-icons/fc';

import './EventBox.css';

const EventBox = (props) => {

  const eventColor = props.event?.category.id === 1 ? 'red'
    : props.event?.category.id === 2 ? 'orange'
      : props.event?.category.id === 3 ? 'yellow'
        : props.event?.category.id === 4 ? 'green'
          : props.event?.category.id === 5 ? 'skyblue'
            : props.event?.category.id === 6 ? 'blue'
              : props.event?.category.id === 7 ? 'purple'
                : 'gray';

  return (
    <div
      className="EventBox"
      style={{ borderLeftColor: eventColor }}
    >
      <div className="left">
        <div className="top">
          <div className="group">
            {props.event?.group?.name}
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
            {props.bringBool ? <MdRemoveShoppingCart size="100%" /> : <MdAddShoppingCart size="100%" />}
          </button>
          <button className="likeEvent" onClick={props.likeEvent}>
            {props.likeBool ? <FcLike size="100%" /> : <FcLikePlaceholder size="100%" />}
          </button>
        </div>

        <div className="tags" style={{ color: eventColor, fontWeight:'bold' }}>
          {props.event?.tag?.map((tag) => {
            return (
              <div key={tag.id} className="tag">
                #{tag.name}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
};

export default EventBox;
