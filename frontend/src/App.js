import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Main from './containers/main/Main';
import Public from './containers/public/Public';
import Private from './containers/private/Private';
import Signup from './containers/signup/Signup';
import Activate from './containers/signup/Activate';

import MyPage from './containers/mypage/mypage/MyPage';
import SettingProfile from './containers/mypage/setting/SettingProfile';
import SettingPassword from './containers/mypage/setting/SettingPassword';
import SettingPreference from './containers/mypage/setting/SettingPreference';

import EventCreate from './containers/event/Create/EventCreate';
import EventModify from './containers/event/Modify/EventModify';
import EventDetail from './containers/event/Detail/EventDetail';

import GroupMain from './containers/group/main/GroupMain';
import GroupSearch from './containers/group/search/GroupSearch';
import GroupSearchAll from './containers/group/search/GroupSearchAll';
import GroupCreate from './containers/group/create/GroupCreate';
import GroupDetail from './containers/group/detail/GroupDetail';

import GroupProfile from './containers/group/setting/GroupProfile';
import GroupMembers from './containers/group/setting/GroupMembers';
import GroupPrivacy from './containers/group/setting/GroupPrivacy';

function App({ history }) {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route path="/main" exact component={Main} />
          <Redirect exact from="/" to="/main" />
          <Route path="/public" exact component={Public} />
          <Route path="/private" exact component={Private} />
          <Route path="/details/create/" exact component={EventCreate} />
          <Route path="/details/:event_id/" exact component={EventDetail} />
          <Route path="/details/modify/:event_id/" exact component={EventModify} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/signup/activate/:uidb64/:token" exact component={Activate} />
          <Route path="/mypage" exact component={MyPage} />
          <Route path="/mypage/setting/profile" exact component={SettingProfile} />
          <Route path="/mypage/setting/password" exact component={SettingPassword} />
          <Route path="/mypage/setting/preference" exact component={SettingPreference} />
          <Route path="/group" exact component={GroupMain} />
          <Route path="/group/search" exact component={GroupSearchAll} />
          <Route path="/group/search/:searchQuery" exact component={GroupSearch} />
          <Route path="/group/create" exact component={GroupCreate} />
          <Route path="/group/details/:id" exact component={GroupDetail} />
          <Route path="/group/:id/setting/profile" exact component={GroupProfile} />
          <Route path="/group/:id/setting/members" exact component={GroupMembers} />
          <Route path="/group/:id/setting/privacy" exact component={GroupPrivacy} />
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
