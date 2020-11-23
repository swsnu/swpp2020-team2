import React from 'react';
import './TopBar.css';
import { appLogo } from '../../images/index';

const TopBar = (props) => (
  <div className="TopBar">
    <img className="logo" src={appLogo} alt="topbar" />
    <button className="tab" onClick={() => props.history.push('/public')} style={{ fontWeight: props.tabNum === 0 ? 'bold' : 'none' }}>Public</button>
    <button className="tab" onClick={() => props.history.push('/public')} style={{ fontWeight: props.tabNum === 1 ? 'bold' : 'none' }}>Private</button>
    <button className="tab" onClick={() => props.history.push('/group')} style={{ fontWeight: props.tabNum === 2 ? 'bold' : 'none' }}>Group</button>
  </div>
);

export default TopBar;
