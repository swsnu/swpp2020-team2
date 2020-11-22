import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';

import * as actionCreators from '../../../store/actions/index';

import { ImSearch } from 'react-icons/im';
import { MdGroupAdd } from 'react-icons/md';

import './GroupSearch.css';

class GroupSearchAll extends Component {
  state={
    searchQuery: '',
  }

  componentDidMount() {
    this.props.getUserFull();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (!this.props.signinedUser) this.props.history.replace('/Main');
    }
  }

  onSearchHandler=() => {
    if (this.state.searchQuery === '') this.props.history.push('/group/search');
    else this.props.history.push(`/group/search/${this.state.searchQuery}`);
  }

  render() {
    const searchResult = null;

    // should implement searchResult, which will have searchboxes of all groups.
    // we can think about show like 10 groups in a page, and make several pages.

    return (
      <div className="GroupSearch">
        <div className="topBar">
          <TopBar history={this.props.history} />
        </div>

        <div className="container">
          <div className="header">
            <div className="searchBox">
              <input
                className="search-group-input"
                type="text"
                value={this.state.searchKey}
                onChange={(event) => this.setState({ searchKey: event.target.value })}
                placeholder=" 그룹명 입력 "
              />
              <button className="search-button" onClick={() => this.onSearchHandler()}>
                <ImSearch size="24" />
              </button>
            </div>

            <div className="createBox">
              <button className="create-group-button" onClick={() => this.props.history.push('/group/create')}>
                <MdGroupAdd size="24" />
                <div className="text">Create Group</div>
              </button>
            </div>
          </div>

        <h2>All Groups Result</h2>
        {searchResult}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userFullInfo: state.ur.userFullInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearchAll);
