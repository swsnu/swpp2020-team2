import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Main from './containers/main/Main';

function App({history}) {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path='/main' exact component={Main}/>
          <Redirect exact from='/' to='/main'/>
          <Route render={()=><h1>Not Found</h1>}/>
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
