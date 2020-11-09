import React, { useState } from 'react';
import './List.css';

const List = ({ events }) => {
  const ListItem = (evt) => {
    const {
      title, place, group, // beginTime, endTime,
    } = evt;
    return (
      <div className="ListItem">
        <div className="host">{group.name}</div>
        <div className="title">{title}</div>
        <div className="place">{`${place}`}</div>
      </div>
    );
  };

  const list = [];
  events.forEach((evt) => {
    list.push(ListItem(evt));
  });
  return <div className="List">{list}</div>;
};

export default List;
