import React, { Component } from 'react';
import { connect } from 'react-redux';

class Mypage extends Component{
  render(){
    return(
      <div className="Mypage">
        My Page
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);