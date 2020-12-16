import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class JoinRequest extends Component {
  render() {
    return (
      <div className="JoinRequest" />
    );
  }
}

const mapStateToProps = (state) => ({
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getGroup: (id) => dispatch(actionCreators.getGroup(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JoinRequest);
