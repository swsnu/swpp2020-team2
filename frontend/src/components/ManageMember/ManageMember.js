import React from 'react';

import {AiFillStar} from 'react-icons/ai';
import {HiBan} from 'react-icons/hi';

const ManageMember=(props)=>(
  <div className="ManageMember">
    {props.lastName}&nbsp;{props.firstName}&nbsp;{props.email}&nbsp;{props.department}
    <div className="btnBox">
      <div className="btn" onClick={() => props.clickAdmin()}>
        {props.admin?<AiFillStar color="yellow" />:<AiFillStar color="grey" />}
      </div>
      <div className="btn" onClick={() => props.clickExpel()}>
        {props.expel?<HiBan color="red" />:<HiBan color="grey" />}
      </div>
    </div>
  </div>
);

export default ManageMember;