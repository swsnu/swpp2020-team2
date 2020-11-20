import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../../store/actions/index';

class GroupSearch extends Component {
  state={
    searchKey:'',
  }

  componentDidMount(){
    this.setState({searchKey:this.props.match.params.searchKey});
    this.props.getUser();
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps!==this.props){
      if(!this.props.signinedUser)this.props.history.replace('/Main');
    }
  }

  onSearchHandler=()=>{
    if(this.state.searchKey==='')this.props.history.push('/group/search');
    else this.props.history.push(`/group/search/${this.state.searchKey}`);
  }

  render(){
    let searchResult=null;

    //make searchResult

    return (
      <div className="GroupSearch">
        <h1>Group</h1>
        <div className="topBar" />

        <input
          id="search-input"
          type="text"
          value={this.state.searchKey}
          onChange={(event) => this.setState({ searchKey: event.target.value })}
        />
        <button id="search-button" onClick={()=>this.onSearchHandler()}>Search!</button>

        <h2>Search Result</h2>
        {searchResult}
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
