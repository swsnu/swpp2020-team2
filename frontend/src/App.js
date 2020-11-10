import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Main from './containers/main/Main';
import Signup from './containers/signup/Signup';
import Activate from './containers/signup/Activate';

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/main" exact component={Main} />
          <Redirect exact from="/" to="/main" />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signup/activate/:uidb64/:token" exact component={Activate} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
