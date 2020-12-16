import React from 'react';

import { GrLike } from 'react-icons/gr';
import { BiBellPlus } from 'react-icons/bi';
import {BsBellFill} from 'react-icons/bs'
import {AiFillLike} from 'react-icons/ai'

const JoinRequest=(props)=>(
  <div className="joinRequest">
    {props.lastName}&nbsp;{props.firstName}&nbsp;{props.email}&nbsp;{props.department}
    <div className="btnBox">
      <div className="btn" onClick={() => props.clickAccept()}>
        {props.accept?<AiFillLike color="blue" />:<GrLike color="black" />}
      </div>
      <div className="btn" onClick={() => props.clickReject()}>
        {props.reject?<BsBellFill color="orange" />:<BiBellPlus color="black" />}
      </div>
    </div>
  </div>
);

export default JoinRequest;