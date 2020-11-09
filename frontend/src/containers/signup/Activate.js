import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class Activate extends Component {
  state={
    uid: null,
    token: null,
  }

  componentDidMount() {
    this.setState({ uid: this.props.match.params.uidb64, token: this.props.match.params.token });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      this.props.activate({ uid: this.state.uid, token: this.state.token });
    }
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
