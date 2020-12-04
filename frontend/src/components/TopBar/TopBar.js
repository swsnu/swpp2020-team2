import React from 'react';
import './TopBar.css';
import { appLogo,uniLogo } from '../../images/index';

import {BiBell} from 'react-icons/bi';

const TopBar = (props) => (
  <div className="TopBar">
    <div className="left">
      <img className="logo" src={appLogo} alt="logo" />
      <button className="tab" onClick={() => props.history.push('/public')} style={{ fontWeight: props.tabNum === 0 ? 'bold' : 'none' }}>
        Public</button>
      <button className="tab" onClick={() => props.history.push('/private')} style={{ fontWeight: props.tabNum === 1 ? 'bold' : 'none' }}>
        Private</button>
      <button className="tab" onClick={() => props.history.push('/group')} style={{ fontWeight: props.tabNum === 2 ? 'bold' : 'none' }}>
        Group</button>
    </div>

    <div className="right">
      <div className="logo" >
        <img src={uniLogo} />
      </div>
      <div className="notice">
        <BiBell size='30px'/>
      </div>
      <div className="profile" onClick={()=>{}}>
        <img src={appLogo} />
      </div>
    </div>
  </div>
);

export default TopBar;
