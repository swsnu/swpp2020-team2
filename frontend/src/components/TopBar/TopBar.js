import React, { useState, useEffect } from 'react';
import './TopBar.css';
import { BiBell } from 'react-icons/bi';
import { appLogo, uniLogo } from '../../images/index';

import ProfileModal from '../profileModal/ProfileModal'

const TopBar = (props) => {

  const [profileModalBool, SetProfileModalBool] = useState(false)
  const [modal, SetModal] = useState(null)

  useEffect(() => {
    if (profileModalBool) SetModal(<ProfileModal history={props.history} />)
    else SetModal(null)
  },[profileModalBool])

  return (
    <div className="TopBar">
      <div className="left">
        <img className="logo" src={appLogo} alt="logo" />
        <button className="tab" onClick={() => props.history.push('/public')} style={{ fontWeight: props.tabNum === 0 ? 'bold' : 'none' }}>
          Public
      </button>
        <button className="tab" onClick={() => props.history.push('/private')} style={{ fontWeight: props.tabNum === 1 ? 'bold' : 'none' }}>
          Private
      </button>
        <button className="tab" onClick={() => props.history.push('/group')} style={{ fontWeight: props.tabNum === 2 ? 'bold' : 'none' }}>
          Group
      </button>
      </div>

      <div className="right">
        <div className="logo">
          <img src={uniLogo} alt="university logo" />
        </div>
        <div className="notice">
          <BiBell size="30px" />
        </div>
        <div className="profile" onClick={() => SetProfileModalBool(!profileModalBool)}>
          <img src={appLogo} alt="app logo" />
          {modal}
        </div>
      </div>
    </div>
  )
}

export default TopBar;
