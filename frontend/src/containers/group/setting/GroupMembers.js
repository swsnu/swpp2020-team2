import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class GroupMembers extends Component {
  state={
  }

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
  }

  onRouteHandler=(url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <div className="GroupMembers">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>
        <h1>Manage members</h1>

        <button onClick={() => this.onRouteHandler(`/group/details/${this.props.match.params.id}`)}>back</button>
        <button onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/profile`)}>Profile</button>
        <button onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/members`)}>Manage members</button>
        <button onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/privacy`)}>Privacy</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getGroup: (id) => dispatch(actionCreators.getGroup(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);