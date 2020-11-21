import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

class GroupSearch extends Component {
  state={
    searchQuery:'',
  }

  componentDidMount(){
    this.setState({searchQuery:this.props.match.params.searchQuery});
    this.props.getUserFull();
  }

  componentDidUpdate(prevProps,prevState){
    if(prevProps!==this.props){
      if(!this.props.signinedUser)this.props.history.replace('/Main');
    }
  }

  onSearchHandler=()=>{
    if(this.state.searchQuery==='')this.props.history.push('/group/search');
    else this.props.history.push(`/group/search/${this.state.searchQuery}`);
  }

  render(){
    let searchResult=null;

    //searchResult=
    //make searchResult

    return (
      <div className="GroupSearch">
        <div>
          <TopBar />
        </div>

        <h1>Group</h1>

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
  userFullInfo: state.ur.userFullInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: ()=>dispatch(actionCreators.getUserFull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
