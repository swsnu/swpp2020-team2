import React from 'react';

import './GroupBox.css';

import { GrLike } from 'react-icons/gr';
import { BiBellPlus } from 'react-icons/bi';
import { RiAlarmWarningFill } from 'react-icons/ri';

const GroupBox = (props) => (
  <div className="GroupBox">
    <img src={props.image} alt="group logo" />
    <div className="name">{props.name}</div>
    <div className="description">{props.description}</div>
    <div className="btnBox">
      <div className="btn" onClick={() => props.like()}>
        <GrLike color="black" />
      </div>
      <div className="btn" onClick={() => props.notice()}>
        <BiBellPlus color="black" />
      </div>
      <div className="btn" onClick={() => props.report()}>
        <RiAlarmWarningFill color="red" />
      </div>
    </div>
  </div>
);

export default GroupBox;
