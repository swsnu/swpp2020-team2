import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

class GroupMain extends Component {
  state={
    searchKey:'',
    joinedGroup:[],
    noticedGroup:[],
    likedGroup:[],
  }

  componentDidMount(){
    this.props.getUserFull();
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps!==this.props){
      if(!this.props.signinedUser)this.props.history.replace('/Main');
      else this.setState({joinedGroup:this.props.userFullInfo.members,noticedGroup:this.props.userFullInfo.gets_notification,likedGroup:this.props.userFullInfo.likes_group});
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

    //please implement components/groupbox/Groupbox first
    //make joinedGroup by this.state.joinedGroup with components/groupbox/Groupbox
    //make noticedGroup by this.state.noticedGroup
    //make likedGroup by this.state.likedGroup

    return (
      <div className="GroupMain">
        <div>
          <TopBar />
        </div>

        <h1>Group</h1>

        <div><button id="create-group-button" onClick={()=>this.props.history.push('/group/create')}>Create Group</button></div>
        <br/>
        <input
          id="search-input"
          type="text"
          value={this.state.searchKey}
          onChange={(event) => this.setState({ searchKey: event.target.value })}
        />
        <button id="search-button" onClick={()=>this.onSearchHandler()}>Search!</button>
        <div>search with blank to see all groups</div>
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
  userFullInfo: state.ur.userFullInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: ()=>dispatch(actionCreators.getUserFull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupMain);
