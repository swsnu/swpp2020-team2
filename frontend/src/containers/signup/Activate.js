import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

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
        <h1>Activate</h1>
        Your account is activated.
        <br />
        You can sign in with your account from now.
        <br />
        <span onClick={() => this.props.history.push('/main')}>Back to main page</span>
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
