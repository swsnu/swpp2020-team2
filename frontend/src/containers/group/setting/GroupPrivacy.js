import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class GroupPrivacy extends Component {
  state={
    privacy: null,
  }

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currGroup) {
      return {
        privacy: props.currGroup.privacy,
      };
    }
    return state;
  }

  onConfirmHandler=() => {
    this.props.changeGroupPrivacy(this.state.privacy);
  }

  onRouteHandler=(url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <div className="GroupPrivacy">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>
        <h1>Privacy</h1>
        <div className="box">
          <label className="label">These group&apos;s members are open to</label>
          <select value={this.props.currGroup?.privacy} onChange={(event) => this.setState({ privacy: event.target.value })}>
            <option value={1}>Only administrators</option>
            <option value={2}>All users</option>
            <option value={3}>No one</option>
          </select>
        </div>

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
  changeGroupPrivacy: (id, privacy) => dispatch(actionCreators.changeGroupPrivacy(id, privacy)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupPrivacy);
