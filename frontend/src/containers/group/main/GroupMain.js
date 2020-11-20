import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

class GroupMain extends Component {
  state={
    searchKey:'',
    joinedGroup:[],
    noticedGroup:[],
    likedGroup:[],
  }

  componentDidMount(){
    this.props.getUser();
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps!==this.props){
      if(!this.props.signinedUser)this.props.history.replace('/Main');
      else this.setState({joinedGroup:this.props.userInfo.members,noticedGroup:this.props.gets_notification,likedGroup:this.props.likes_group});
    }
  }

  onSearchHandler=()=>{
    if(this.state.searchKey==='')this.props.history.push('/group/search');
    else this.props.history.push(`/group/search/${this.state.searchKey}`);
  }

  render(){
    let joinedGroup=null;
    let noticedGroup=null;
    let likedGroup=null;

    //make joinedGroup by this.state.joinedGroup with components/groupbox/groupbox
    //make noticedGroup by this.state.noticedGroup
    //make likedGroup by this.state.likedGroup

    return (
      <div className="GroupMain">
        <h1>Group</h1>
        <div className="topBar" />

        <input
          id="search-input"
          type="text"
          value={this.state.searchKey}
          onChange={(event) => this.setState({ searchKey: event.target.value })}
        />
        <button id="search-button" onClick={()=>this.onSearchHandler()}>Search!</button>
        <h2>My Groups</h2>
        {joinedGroup}
        <h2>Noticing Groups</h2>
        {noticedGroup}
        <h2>Liked Groups</h2>
        {likedGroup}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userInfo: state.ur.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: ()=>dispatch(actionCreators.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMain);
