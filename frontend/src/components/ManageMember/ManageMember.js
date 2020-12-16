import React from 'react';

import { GrLike } from 'react-icons/gr';
import { BiBellPlus } from 'react-icons/bi';
import {BsBellFill} from 'react-icons/bs'
import {AiFillLike} from 'react-icons/ai'

const ManageMember=(props)=>(
  <div className="ManageMember">
    {props.lastName}&nbsp;{props.firstName}&nbsp;{props.email}&nbsp;{props.department}
    <div className="btnBox">
      <div className="btn" onClick={() => props.clickAdmin()}>
        {props.admin?<AiFillLike color="blue" />:<GrLike color="black" />}
      </div>
      <div className="btn" onClick={() => props.clickExpel()}>
        {props.expel?<BsBellFill color="orange" />:<BiBellPlus color="black" />}
      </div>
    </div>
  </div>
);

export default ManageMember;