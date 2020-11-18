import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import EventDetail from './EventDetail';

import getMockStore from '../../../test-utils/mocks';
/*
import * as actionCreators from '../../../store/actions/articles';
import * as actionCreators_comments from '../../../store/actions/comments';
import * as actionCreators_user from '../../../store/actions/users';
*/

const stubInitialState = [

];

const mockStore = getMockStore(stubInitialState);

describe('<eventDetail />', () => {
  let eventDetail; let
    spyGetComments;

  const history = createBrowserHistory();

  beforeEach(() => {
    eventDetail = (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <EventDetail match={{ params: { id: 1 } }} history={history} />} />
            <Route path="/Public" exact render={() => <h1>ArticleList</h1>} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  });
  afterEach(() => {
    history.push('/');
  });

  it('should render eventDetail without error', () => {
    const component = mount(eventDetail);
    const wrapper = component.find('.EventDetail');

    expect(wrapper.length).toBe(1);
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
  });
});
