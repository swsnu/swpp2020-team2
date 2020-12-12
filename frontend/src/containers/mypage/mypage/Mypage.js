import React, { Component } from 'react';
import { connect } from 'react-redux';

class MyPage extends Component {
  render() {
    return (
      <div className="MyPage">
        My Page
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
