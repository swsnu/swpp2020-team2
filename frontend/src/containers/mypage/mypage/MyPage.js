import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../../../components/TopBar/TopBar';
import * as actionCreators from '../../../store/actions/index';

import { FiSettings } from 'react-icons/fi'
import { BsFillPersonLinesFill } from 'react-icons/bs'

import './Mypage.css'

class MyPage extends Component {
  componentDidMount() {
    if(localStorage.getItem('isLogin')!='true') this.props.history.replace('/main');
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

        <div className="header">
          <label>My Page</label>
          <div className="settingsBtn" onClick={() => this.props.history.push('/mypage/setting/profile')}>
              <FiSettings size={40}/>
          </div>
        </div>

        <div className="body">

          <div className="profileImage">
              <BsFillPersonLinesFill size={200}/>
          </div>

          <div className="infoBox">

            <div className="line">
              <label>Name</label>
              <div className="info">
                {this.props.userInfo?.first_name}{this.props.userInfo?.last_name}
              </div>
            </div>

            <div className="line">
              <label>ID</label>
              <div className="info">
                {this.props.userInfo?.username}
              </div>
            </div>

            <div className="line">
              <label>University</label>
              <div className="info">
                {this.props.userInfo?.university.name}
              </div>
            </div>

            <div className="line">
              <label>Department</label>
              <div className="info">
                {this.props.userInfo?.department.name}
              </div>
            </div>

            <div className="line">
              <label>Email</label>
              <div className="info">
                {this.props.userInfo?.email}
              </div>
            </div>

          </div>
        </div>
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
