import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class GroupProfile extends Component {
  state={
    groupName: '',
    description: '',
  }

  componentDidMount() {
    this.props.getGroup(this.props.match.params.id);
  }

  onConfirmHandler=() => {
    if(this.state.groupName===''||this.state.description==='')alert('please fill name and description!');
    else this.props.changeGroupInfo(this.props.match.params.id,this.state.groupName,this.state.description);
  }

  onRouteHandler=(url) => {
    this.props.history.push(url);
  }

  render() {
    return (
      <div className="GroupProfile">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>
        <h1>Profile</h1>
        <div className="box">
          <label className="label">Group name:</label>
          <div className="inputBox">
            <input
              id="groupname-input"
              type="text"
              value={this.props.currGroup?.name}
              onChange={(event) => this.setState({ groupName: event.target.value })}
            />
          </div>
          <div className="inputBox">
            <input
              id="description-input"
              type="text"
              value={this.props.currGroup?.description}
              onChange={(event) => this.setState({ description: event.target.value })}
            />
          </div>
        </div>
        <button onClick={() => this.onConfirmHandler()}>Confirm</button>

        <button onClick={() => this.onRouteHandler(`/group/details/${this.props.match.params.id}`)}>back</button>
        <button onClick={() => this.onRouteHandler(`/group/${this.props.match.params.id}/setting/profile`)}>Profile</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/password')}>Manage members</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/preference')}>Privacy</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getGroup: (id) => dispatch(actionCreators.getGroup(id)),
  changeGroupInfo:(id,name,description)=>dispatch(actionCreators.changeGroupInfo(id,name,description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupProfile);
