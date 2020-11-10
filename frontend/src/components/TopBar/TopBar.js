import React from 'react';
import './TopBar.css';

const TopBar = (props) => (
  <div className="TopBar">
    <div className="title">Almanac</div>
    <div className="activeTab">Public</div>
    <div className="tab">Private</div>
    <div className="tab">Group</div>
  </div>
);

export default TopBar;
