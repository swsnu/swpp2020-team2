import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

import './SettingPersonal.css'

// need to make background color box component for here
// but low priority

class SettingPreference extends Component {
  state = {
    language: null,
  }

  componentDidMount() {
    if(localStorage.getItem('isLogin')!='true') this.props.history.replace('/main');
    this.props.getUserFull();
    this.props.getLanguages();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userFullInfo && !state.language) {
      return { ...state, language: props.userFullInfo.language };
    }
    return state;
  }

  onConfirmHandler = () => {
    this.props.changeLanguage(this.state.language);
    alert('Setting has been applied!');
  }

  onRouteHandler = (url) => {
    this.props.history.push(url);
  }

  render() {
    var makeOption = function func(X) {
      return <option key={X.id} value={X.id}>{X.name}</option>;
    };

    return (
      <div className="SettingPersonal">
        <div className="topBar">
          <TopBar
            tabNum={null}
            history={this.props.history}
          />
        </div>

        <div className="container">
          <div className="left">
            <button className="myPageBtn" onClick={() => this.onRouteHandler('/mypage')}>My Page</button>

            <div className="tabBar">
              <label>Personal Settings</label>
              <div className="profileBtn" onClick={() => this.onRouteHandler('/mypage/setting/profile')} style={{color:"blue"}}>Profile</div>
              <div className="passwordBtn" onClick={() => this.onRouteHandler('/mypage/setting/password')}>Change Password</div>
              <div className="preferenceBtn" onClick={() => this.onRouteHandler('/mypage/setting/preference')}>Preference</div>
            </div>
          </div>

          <div className="right">
            <div className="header">
              <label>Preference Setting</label>
              <button className="confirmBtn" onClick={() => this.onConfirmHandler()}>Confirm</button>
            </div>

            <div className="body">
              <div className="box">
                <label>language</label>
                <div className="infoBox">
                  <select id="department-input" onChange={(event) => this.setState({ language: event.target.value })}>
                    {this.props.languages.map(makeOption)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

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
