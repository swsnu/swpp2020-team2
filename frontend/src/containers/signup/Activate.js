import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';
import './Activate.css'

class Activate extends Component {
  componentDidMount() {
    this.props.activate({
      uidb64: parseInt(this.props.match.params.uidb64),
      token: parseInt(this.props.match.params.token),
    });
  }

  render() {
    return (
      <div className="Activate">
        <div className="top">
          <div className="title">Almanac</div>
          <div className="description">A university events calendar</div>
        </div>

        <h1>Congratulation!</h1>
        <div className="text">Your account is activated.</div>
        <div className="text">You can sign in with your account from now.</div>

        <span className="back" onClick={() => this.props.history.push('/main')}>Click to go to main page</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
});

const mapDispatchToProps = (dispatch) => ({
  activate: (args) => dispatch(actionCreators.activate(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
