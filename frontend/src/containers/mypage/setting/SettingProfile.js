import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

class SettingProfile extends Component {
  state={
    firstName: '',
    lastName: '',
    department: null,
  }

  componentDidMount() {
    this.props.getUser();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userInfo) {
      return {
        firstName: props.userInfo.first_name,
        lastName: props.userInfo.last_name,
        department: props.userInfo.department,
      };
    }
    return state;
  }

  onRouteHandler=(url) => {
    // alert if there is unsaved content
    this.props.history.push(url);
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
        <h1>Profile Setting</h1>
        <button onClick={() => this.onRouteHandler('/mypage')}>back</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/profile')}>Profile</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/password')}>Change Password</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/preference')}>Preference</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingProfile);
