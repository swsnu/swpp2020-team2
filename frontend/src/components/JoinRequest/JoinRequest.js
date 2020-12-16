import React from 'react';

import { FaCheck } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';

import './JoinRequest.css'

const JoinRequest = (props) => (
  <div className="JoinRequest">
    <div className="col" style={{ flex: 2 }}>{props.lastName} {props.firstName}</div>
    <div className="col" style={{ flex: 3 }}>{props.email}</div>
    <div className="col" style={{ flex: 3 }}>{props.department}</div>
    <div className="btn" style={{ flex: 1 }} onClick={() => props.clickAccept()}><FaCheck color={props.accept ? "blue" : "grey"} /></div>
    <div className="btn" style={{ flex: 1 }} onClick={() => props.clickReject()}><ImCross color={props.reject ? "red" : "grey"} /></div>
  </div>
);

export default JoinRequest;