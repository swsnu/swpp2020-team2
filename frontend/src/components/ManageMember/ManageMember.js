import React from 'react';

import {AiFillStar} from 'react-icons/ai';
import {HiBan} from 'react-icons/hi';

import './ManageMember.css'

const ManageMember = (props) => (
  <div className="ManageMember">
    <div className="col" style={{ flex: 2 }}>{props.lastName} {props.firstName}</div>
    <div className="col" style={{ flex: 3 }}>{props.email}</div>
    <div className="col" style={{ flex: 3 }}>{props.department}</div>
    <div className="btn" style={{ flex: 1 }} onClick={() => props.clickAdmin()}><AiFillStar color={props.admin ? "yellow" : "grey"} /></div>
    <div className="btn" style={{ flex: 1 }} onClick={() => props.clickExpel()}><HiBan color={props.expel ? "red" : "grey"} /></div>
  </div>
);

export default ManageMember;

