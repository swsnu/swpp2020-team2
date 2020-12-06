import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ImSearch } from 'react-icons/im';
import { MdGroupAdd } from 'react-icons/md';
import TopBar from '../../../components/TopBar/TopBar';
import groupBox from '../../../components/groupBox/GroupBox';

import * as actionCreators from '../../../store/actions/index';

import './GroupSearch.css';

class GroupSearch extends Component {
  state = {
    searchQuery: '',
  }

  componentDidMount() {
    this.setState({ searchQuery: this.props.match.params.searchQuery });
    this.props.getUserFull();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.signinedUser) this.props.history.replace('/main');
    if (this.state.searchQuery) this.props.searchGroup(this.state.searchQuery);
  }

  onSearchHandler = () => {
    if (this.state.searchQuery !== '') this.props.history.push(`/group/search/${this.state.searchQuery}`);
  }

  onLikeHandler=(id) => {
    // see if group id is in user's liked group list. select operation and call likeGroup in user.
  }

  onNoticeHandler=(id) => {

  }

  render() {
    var makeGroupBox = function (group) {
      return (
        <groupBox
          name={group.name}
          description={group.description}
          like={(id) => this.onLikeHandler(id)}
          notice={(id) => this.onNoticeHandler(id)}
          report={() => {}}
        />
      );
    };

    return (
      <div className="GroupSearch">
        <div className="topBar">
          <TopBar
            tabNum={2}
            history={this.props.history}
          />
        </div>

        <div className="container">
          <div className="header">
            <div className="searchBox">
              <input
                className="search-group-input"
                type="text"
                value={this.state.searchKey}
                onChange={(event) => this.setState({ searchQuery: event.target.value })}
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

          <h2>Group Search Result</h2>
          {this.props.searchGroups.map(makeGroupBox)}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  signinedUser: state.ur.signinedUser,
  userFullInfo: state.ur.userFullInfo,
  searchGroups: state.gr.searchGroups,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
  searchGroup: (query) => dispatch(actionCreators.searchGroup(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupSearch);
