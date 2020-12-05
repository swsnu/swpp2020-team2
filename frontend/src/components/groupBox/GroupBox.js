import React from 'react';

import './GroupBox.css';

import { GrLike } from 'react-icons/gr';
import { BiBellPlus } from 'react-icons/bi';
import { RiAlarmWarningFill } from 'react-icons/ri';

// should implement groupbox, which will show group name, description, (like, join request, notice and report) buttons.
// props will have things like group name, description, handlers for buttons(and image).

const GroupBox = (props) => (
  <div className="GroupBox">
    <img src={props.image} alt="group logo" />
    <div className="name">{props.name}</div>
    <div className="description">{props.description}</div>
    <div className="btnBox">
      <div className="btn" onClick={props.like}>
        <GrLike color="black" />
      </div>
      <div className="btn" onClick={props.notice}>
        <BiBellPlus color="black" />
      </div>
      <div className="btn" onClick={props.report}>
        <RiAlarmWarningFill color="red" />
      </div>
    </div>
  </div>
);

export default GroupBox;
