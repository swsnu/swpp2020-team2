import React, { Component } from 'react';
import './ProfileModal.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

const ProfileModal = (props) => {

  const onClickSignOut = () => {
    props.onSignOut();
  }

  return (
    <div className="ProfileModal">
      <div className="btn" onClick={() => props.history.push('./mypage')} >Mypage</div>
      <div className="btn" onClick={() => onClickSignOut()} >Sign out</div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onSignOut: () => dispatch(actionCreators.signOut()),
});

export default connect(null, mapDispatchToProps)(ProfileModal);
