import React from 'react';
import './TopBar.css';
import {appLogo} from '../../images/index'

const TopBar = (props) => (
  <div className="TopBar">
    <img className="logo" src={appLogo} />
    <button className="activeTab" onClick={()=> props.history.push('/public')}>Public</button>
    <button className="tab" onClick={()=> props.history.push('/public')}>Private</button>
    <button className="tab" onClick={()=> props.history.push('/group')}>Group</button>
  </div>
);

export default TopBar;
