import React from 'react';

import './GroupBox.css';

import { GrLike } from 'react-icons/gr';
import { BiBellPlus } from 'react-icons/bi';
import { RiAlarmWarningFill } from 'react-icons/ri';


import { BsBellFill } from 'react-icons/bs'
import { AiFillLike } from 'react-icons/ai'

import { HiUserGroup } from 'react-icons/hi'

const GroupBox = (props) => (
  <div className="GroupBox">
    <div className="img">
      <HiUserGroup size={48} />
    </div>
    <div className="name" onClick={() => props.detail()} >{props.name}</div>
    <div className="description">{props.description}</div>
    <div className="btnBox">
      <div className="btn" onClick={() => props.like()}>
        {props.liked ? <AiFillLike color="blue" /> : <GrLike color="black" />}
      </div>
      <div className="btn" onClick={() => props.notice()}>
        {props.noticed ? <BsBellFill color="orange" /> : <BiBellPlus color="black" />}
      </div>
      <div className="btn" onClick={() => props.report()}>
        <RiAlarmWarningFill color="red" />
      </div>
    </div>
  </div>
);

export default GroupBox;
