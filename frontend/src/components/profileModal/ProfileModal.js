import React, { Component } from 'react';
import './ProfileModal.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import {BsPersonSquare} from 'react-icons/bs'

const ProfileModal = (props) => {
  const onClickSignOut = () => {
    props.onSignOut();
    props.history.push('/main');
  };

  return (
    <div className="ProfileModal">
      <div className="icon"><BsPersonSquare size={42}/></div>
      <div className="btn" onClick={() => props.history.push('/mypage')}>Mypage</div>
      <div className="btn" onClick={() => onClickSignOut()}>Sign out</div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(actionCreators.signOut()),
});

export default connect(null, mapDispatchToProps)(ProfileModal);
