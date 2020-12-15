import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class MyPage extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="MyPage">
        <div className="topBar">
          <TopBar
            tabNum={null}
            history={this.props.history}
          />
        </div>
        <h1>My Page</h1>
        <h2>
          Name:
          {this.props.userInfo?.first_name}
          {this.props.userInfo?.last_name}
        </h2>
        <h2>
          ID:
          {this.props.userInfo?.username}
        </h2>
        <h2>
          University:
          {this.props.userInfo?.university.name}
        </h2>
        <h2>
          Department:
          {this.props.userInfo?.department.name}
        </h2>
        <h2>
          Email:
          {this.props.userInfo?.email}
        </h2>
        <button className="setting-button" onClick={() => { this.props.history.push('/mypage/setting/profile'); }}>settings</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.ur.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(actionCreators.getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
