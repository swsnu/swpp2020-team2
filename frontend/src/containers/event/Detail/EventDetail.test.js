import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { history, middlewares } from '../../../store/store';
import EventDetail from './EventDetail';

import getMockStore from '../../../test-utils/mocks';
/*
import * as actionCreators from '../../../store/actions/articles';
import * as actionCreators_comments from '../../../store/actions/comments';
import * as actionCreators_user from '../../../store/actions/users';
*/

const stubInitialState = {
  target: {},
};

const stubInitialState2 = {
  target: {
    id: 1,
    title: 'HIS 공연',
    group: 'HIS',
    place: '학생회관',
    begin_time: '09:00',
    end_time: '14:00',
    category: {
      id: 0,
      name: '공연',
    },
    date: new Date(),
  },
};

const stubInitialState3 = {
  target: undefined,
};

const mockStore = getMockStore(stubInitialState);
const mockStore2 = getMockStore(stubInitialState2);
const mockStore3 = getMockStore(stubInitialState3);

describe('<eventDetail />', () => {
  let eventDetail;

  beforeEach(() => {
  });
  afterEach(() => {
  });

  it('should render eventDetail without error', () => {
    eventDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <EventDetail history={history} match={{ params: { event_id: 1 } }} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(eventDetail);
    const wrapper = component.find('.EventDetail');
    expect(wrapper.length).toBe(1);

    eventDetail = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <EventDetail history={history} match={{ params: { event_id: 1 } }} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component2 = mount(eventDetail);
    const wrapper2 = component2.find('.EventDetail');
    expect(wrapper2.length).toBe(1);

    eventDetail = (
      <Provider store={mockStore3}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <EventDetail history={history} match={{ params: { event_id: 1 } }} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const component3 = mount(eventDetail);
    const wrapper3 = component3.find('.EventDetail');
    expect(wrapper3.length).toBe(1);
  });

  /*
    it(`should call 'setArticle'`, () => {
        const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(path => { });
        const component = mount(eventDetail);
        const wrapper = component.find('#edit-article-button');

        wrapper.simulate('click');
        expect(spyHistoryPush).toHaveBeenCalledWith('/articles/1/edit');

    });
    */

  it('should back to page after click back button', () => {
    const spyHistoryPush = jest.spyOn(history, 'goBack').mockImplementation((path) => {});

    const component = mount(eventDetail);
    const wrapper = component.find('.back');

    wrapper.simulate('click');

    expect(spyHistoryPush).toHaveBeenCalledTimes(1);

    const button1 = component.find('.bringEvent');
    expect(button1.length).toBe(1);
    button1.simulate('click');

    const button2 = component.find('.likeEvent');
    expect(button2.length).toBe(1);
    button2.simulate('click');

    const button3 = component.find('.reportEvent');
    expect(button3.length).toBe(1);
    button3.simulate('click');
  });
});
