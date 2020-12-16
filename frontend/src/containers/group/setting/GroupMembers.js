import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class GroupMembers extends Component {
  state={
    joinRequests:[],
    manageMembers:[],
  }

  componentDidMount() {
    this.props.getGroupFull(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currGroup) {
      var joinRequests=[];
      for(var user in props.currGroup.join_requests){
        joinRequests[user.id]={accept:false,reject:false};
      }
      var manageMembers=[];
      for(var member in props.currGroup.member){
        var admin=false;
        if(props.currGroup.admin.find(e=>e.id===member.id))admin=true;
        manageMembers[member.id]={admin,expel:false};
      }
      return {joinRequests,manageMembers};
    }
    return state;
  }

  onConfirmHandler=() => {
    for(var user in this.props.currGroup.join_requests){
      if(this.state.joinRequests[user.id].accept){
        this.props.manageMember(this.props.match.params.id,user.id,'add');
      }
      if(this.state.joinRequests[user.id].reject){
        this.props.handleJoinRequest(this.props.match.params.id,user.id,'remove');
      }
    }
    for(var member in this.props.currGroup.member){
      if(this.state.manageMembers[member.id].expel){
        this.props.manageMember(this.props.match.params.id,member.id,'remove');
      }
      else if(this.state.manageMembers[member.id].admin){
        this.props.manageAdmin(this.props.match.params.id,member.id,'add');
      }
    }
  }

  onRouteHandler=(url) => {
    this.props.history.push(url);
  }

  joinRequestHandler=(id,op)=>{
    var joinRequests=this.state.joinRequests.slice();
    if(op==='accept'){
      if(this.state.joinRequests[id].accept){
        joinRequests[id]={accept:false,reject:false};
      }
      else{
        joinRequests[id]={accept:true,reject:false};
      }
    }
    else{
      if(this.state.joinRequests[id].reject){
        joinRequests[id]={accept:false,reject:false};
      }
      else{
        joinRequests[id]={accept:false,reject:true};
      }
    }
    this.setState({...this.state,joinRequests});
  }

  manageMembersHandler=(id,op)=>{
    var manageMembers=this.state.manageMembers.slice();
    if(op==='admin'){
      manageMembers[id].admin=!manageMembers[id].admin;
    }
    else{
      manageMembers[id].expel=!manageMembers[id].expel;
    }
    this.setState({...this.state,manageMembers});
  }

  makeJoinReqeustRow=(user) => {
    return(<div className="JoinReqeust">
      {user.last_name}&nbsp;{user.first_name}&nbsp;{user.email}&nbsp;{user.department.name}
      <input
        type="checkbox"
        checked={this.state.joinRequests[user.id]?.accept}
        onChange={()=>this.joinRequestHandler(user.id,'accept')}
      />
      <input
        type="checkbox"
        checked={this.state.joinRequests[user.id]?.reject}
        onChange={()=>this.joinRequestHandler(user.id,'reject')}
      />
    </div>
    );
  }

  makeMembersManageRow=(member)=>{
    return(<div className="ManageMember">
      {member.last_name}&nbsp;{member.first_name}&nbsp;{member.email}&nbsp;{member.department.name}
      <input
        type="checkbox"
        checked={this.state.manageMembers[member.id]?.admin}
        onChange={()=>this.manageMembersHandler(member.id,'admin')}
      />
      <input
        type="checkbox"
        checked={this.state.joinRequests[member.id]?.expel}
        onChange={()=>this.manageMembersHandler(member.id,'expel')}
      />
    </div>
    );
  }

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
        <div className="box">
          <h2>Join application</h2>
          <label className="label">Name/Email/Dept/Accept/Reject</label>
          <div>{this.props.currGroup?.join_requests.map(this.makeJoinReqeustRow)}</div>
          <label className="label">Name/Email/Dept/Admin/Expel</label>
          <div>{this.props.currGroup?.member.map(this.makeMembersManageRow)}</div>
          <label className="label">Name/Email/Dept/King</label>
          <h3>king manage table</h3>
        </div>
        <button onClick={() => this.onConfirmHandler()}>Confirm</button>

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
  getGroupFull: (id) => dispatch(actionCreators.getGroupFull(id)),
  manageMember: (groupId,userId,op)=>dispatch(actionCreators.manageMember(groupId,userId,op)),
  manageAdmin: (groupId,userId,op)=>dispatch(actionCreators.manageAdmin(groupId,userId,op)),
  handleJoinRequest: (groupId,userId,op)=>dispatch(actionCreators.handleJoinRequest(groupId,userId,op)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
