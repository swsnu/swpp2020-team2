import React, {Component} from 'react';
import {connect} from 'react-redux';

class Main extends Component{
  render(){
    return(
      <div className="Main">
        <h1>Almanac</h1>
      </div>
    )
  }
}

export default connect(null,null)(Main);