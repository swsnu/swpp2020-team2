import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

// need to make background color box component for here
// but low priority

class SettingPreference extends Component {
  state={
    language: 0,
  }

  componentDidMount() {
    this.props.getUserFull();
    this.props.getLanguages();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userFullInfo) {
      return { ...state, language: props.userFullInfo.language };
    }
    return state;
  }

  onConfirmHandler=() => {
    this.props.changeLanguage(this.state.language);
    alert('Setting has been applied!');
  }

  onRouteHandler=(url) => {
    this.props.history.push(url);
  }

  render() {
    var makeOption = function func(X) {
      return <option value={X.id}>{X.name}</option>;
    };

    return (
      <div className="MyPage">
        <div className="topBar">
          <TopBar
            tabNum={null}
            history={this.props.history}
          />
        </div>
        <h1>Preference Setting</h1>
        <h2>language</h2>
        <select id="department-input" onChange={(event) => this.setState({ language: event.target.value })}>
          {this.props.languages.map(makeOption)}
        </select>
        <button onClick={() => this.onConfirmHandler()}>Confirm</button>

        <button onClick={() => this.onRouteHandler('/mypage')}>back</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/profile')}>Profile</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/password')}>Change Password</button>
        <button onClick={() => this.onRouteHandler('/mypage/setting/preference')}>Preference</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userFullInfo: state.ur.userFullInfo,
  languages: state.or.languages,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFull: () => dispatch(actionCreators.getUserFull()),
  getLanguages: () => dispatch(actionCreators.getLanguages()),
  changeLanguage: (language) => dispatch(actionCreators.changeLanguage(language)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPreference);
