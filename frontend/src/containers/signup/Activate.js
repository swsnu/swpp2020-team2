import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class Activate extends Component {
  render() {
    return (
      <div className="Activate">
        <h1>Activate</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Activate);
