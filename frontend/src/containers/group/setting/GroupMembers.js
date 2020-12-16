import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import JoinRequest from '../../../components/JoinRequest/JoinRequest';
import ManageMember from '../../../components/ManageMember/ManageMember';
import * as actionCreators from '../../../store/actions/index';

class GroupMembers extends Component {
  state={
    joinRequests:[],
    manageMembers:[],
  }

  componentDidMount() {
    this.props.getUser();
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
    if(id===this.props.signinedUser)alert('You cannot deauthorize/expel yourself!');
    else{
      var manageMembers=this.state.manageMembers.slice();
      if(op==='admin'){
        if(this.state.manageMembers[id].admin){
          manageMembers[id]={admin:false,expel:false};
        }
        else{
          manageMembers[id]={admin:true,expel:false};
        }
      }
      else{
        if(this.state.manageMembers[id].expel){
          manageMembers[id]={admin:false,expel:false};
        }
        else{
          manageMembers[id]={admin:false,expel:true};
        }
      }
      this.setState({...this.state,manageMembers});
    }
  }

  makeJoinReqeustRow=(user) => {
    return(
      <JoinRequest
        key={user.id}
        firstName={user.first_name}
        lastName={user.last_name}
        email={user.email}
        department={user.department.name}
        accept={this.state.joinRequests[user.id]?.accept}
        clickAccept={()=>this.joinRequestHandler(user.id,'accept')}
        reject={this.state.joinRequests[user.id]?.reject}
        clickReject={()=>this.joinRequestHandler(user.id,'reject')}
      />
    );
  }

  makeMembersManageRow=(member)=>{
    return(
      <ManageMember
        key={member.id}
        firstName={member.first_name}
        lastName={member.last_name}
        email={member.email}
        department={member.department.name}
        admin={this.state.manageMembers[member.id]?.admin}
        clickAdmin={()=>this.manageMembersHandler(member.id,'admin')}
        expel={this.state.manageMembers[member.id]?.expel}
        clickExpel={()=>this.manageMembersHandler(member.id,'expel')}
      />
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
  signinedUser: state.ur.signinedUser,
  currGroup: state.gr.currGroup,
});

const mapDispatchToProps = (dispatch) => ({
  getUser:()=>dispatch(actionCreators.getUser()),
  getGroupFull: (id) => dispatch(actionCreators.getGroupFull(id)),
  manageMember: (groupId,userId,op)=>dispatch(actionCreators.manageMember(groupId,userId,op)),
  manageAdmin: (groupId,userId,op)=>dispatch(actionCreators.manageAdmin(groupId,userId,op)),
  handleJoinRequest: (groupId,userId,op)=>dispatch(actionCreators.handleJoinRequest(groupId,userId,op)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMembers);
