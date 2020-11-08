import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Main from './containers/main/Main';

function App(props) {
  return (
    <ConnectedRouter history={props.history}>
      <div className="App">
        <Switch>
          <Route path='/main' exact component={Main}/>
          <Redirect exact from='/' to='/main'/>
          <Route render={()=><h1>Not found</h1>}/>
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
