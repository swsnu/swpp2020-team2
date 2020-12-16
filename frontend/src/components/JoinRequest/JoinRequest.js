import React from 'react';

import {FaCheck} from 'react-icons/fa';
import {ImCross} from 'react-icons/im';

const JoinRequest=(props)=>(
  <div className="JoinRequest">
    {props.lastName}&nbsp;{props.firstName}&nbsp;{props.email}&nbsp;{props.department}
    <div className="btnBox">
      <div className="btn" onClick={() => props.clickAccept()}>
        {props.accept?<FaCheck color="blue" />:<FaCheck color="grey" />}
      </div>
      <div className="btn" onClick={() => props.clickReject()}>
        {props.reject?<ImCross color="red" />:<ImCross color="grey" />}
      </div>
    </div>
  </div>
);

export default JoinRequest;