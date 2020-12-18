import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import EventCreate from './EventCreate';

import getMockStore from '../../../test-utils/mocks';

import * as userActions from '../../../store/actions/user';
import * as eventActions from '../../../store/actions/events';
import * as groupActions from '../../../store/actions/group';
import * as otherActions from '../../../store/actions/other';
import { ConnectedRouter } from 'connected-react-router';

const stubInitialState = {
  signedUser: 1,
  categories: [
    {
      id: 1,
      name: 'TEST_CTG1'
    },
    {
      id: 2,
      name: 'TEST_CTG2'
    },
  ],
  myGroups: [1],

  tagRecommend: [1, 2],
  selectedImage: [{ id: 1 }],
}

const mockStore = getMockStore(stubInitialState);

describe('<EventCreate />', () => {
  let eventCreate, spyGetUser, spyGetCategory, spyGetMyGroup;

  const history = createBrowserHistory();

  beforeEach(() => {
    global.localStorage.setItem('isLogin', 'true');
    eventCreate = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact render={() => <EventCreate history={history} location={{ state: { date: '2020-12-18' } }} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyGetUser = jest.spyOn(userActions, 'getUser').mockImplementation(() => (dispatch) => { });
    spyGetCategory = jest.spyOn(otherActions, 'getCategories').mockImplementation(() => (dispatch) => { });
    spyGetMyGroup = jest.spyOn(groupActions, 'getMyGroup').mockImplementation((id) => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render eventCreate without errors', () => {
    const component = mount(eventCreate);
    const wrapper = component.find('.EventCreate');
    expect(wrapper.length).toBe(1);
  });

  it(`should set state properly on title input`, () => {
    const newTitle = 'TEST_CREATE_TITLE'
    const component = mount(eventCreate);
    const wrapper = component.find('.event-title-input');
    wrapper.simulate('change', { target: { value: newTitle } });

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.title).toEqual(newTitle);
  });

  it(`should set state properly on content input`, () => {
    const newContent = 'TEST_CREATE_CONTENT'
    const component = mount(eventCreate);
    const wrapper = component.find('.event-content-input');
    wrapper.simulate('change', { target: { value: newContent } });

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.content).toEqual(newContent);
  });

  it(`should set state properly on place input`, () => {
    const newPlace = 'TEST_CREATE_PLACE'
    const component = mount(eventCreate);
    const wrapper = component.find('.event-place-input');
    wrapper.simulate('change', { target: { value: newPlace } });

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.place).toEqual(newPlace);
  });

  it(`should set state properly on category input`, () => {
    const newCategory = 2;
    const component = mount(eventCreate);
    const wrapper = component.find('.event-category-input');
    wrapper.simulate('change', { target: { value: newCategory } });

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.category).toEqual(newCategory);
  });

  it(`should set state properly on group input`, () => {
    const newGroup = 2;
    const component = mount(eventCreate);
    const wrapper = component.find('.event-group-input');
    wrapper.simulate('change', { target: { value: newGroup } });

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.group).toEqual(newGroup);
  });

  it(`should set state properly on begin_time input`, () => {
    const newBegin_time = '12:00'
    const component = mount(eventCreate);
    const wrapper = component.find('.event-begin_time-input');
    wrapper.simulate('change', { target: { value: newBegin_time } });

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.begin_time).toEqual(newBegin_time);
  });

  it(`should set state properly on end_time input`, () => {
    const newEnd_time = '13:00'
    const component = mount(eventCreate);
    const wrapper = component.find('.event-end_time-input');
    wrapper.simulate('change', { target: { value: newEnd_time } });

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.end_time).toEqual(newEnd_time);
  });

  it(`should set selectedTag after clicking tag`, () => {
    const component = mount(eventCreate);

    component.find('.UnSelected').simulate('click');

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.selectTags).toContain(1);

    component.find('.Selected').simulate('click');
    expect(eventCreateInstance.state.selectTags.length).toBe(0);
  });

  it(`should recommend tag after clicking btn with content input`, () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => null);
    const spyGetTagRecommend = jest.spyOn(eventActions, 'getTagRecommend').mockImplementation((content) => {
      return dispatch => { stubInitialState.tagRecommend = [{id:3}, {id:4}] };
    }
    );

    const component = mount(eventCreate);

    component.find('.addTag').simulate('click');
    expect(spyAlert).toHaveBeenCalledTimes(1);

    component.find('.event-content-input').simulate('change', { target: { value: "newcontent" } });
    component.find('.addTag').simulate('click');
    expect(spyGetTagRecommend).toHaveBeenCalledTimes(1);

    const eventCreateInstance = component.find(EventCreate.WrappedComponent).instance();
    expect(eventCreateInstance.state.tags.length).toBe(2);
  });

  it(`should call 'CreateEvent' and go to public after Creating`, () => {
    const spyHistoryReplace = jest.spyOn(history, 'replace').mockImplementation(path => { });
    const spyCreateEvent = jest.spyOn(eventActions, 'createEvent').mockImplementation((event) => { return dispatch => { }; });

    const component = mount(eventCreate);

    component.find('.event-begin_time-input').simulate('change', { target: { value: '00:00' } });
    component.find('.event-end_time-input').simulate('change', { target: { value: '01:00' } });
    component.find('.event-title-input').simulate('change', { target: { value: 'newTitle' } });
    component.find('.event-category-input').simulate('change', { target: { value: 1 } });
    component.find('.event-place-input').simulate('change', { target: { value: 'newPlace' } });
    component.find('.event-group-input').simulate('change', { target: { value: 1 } });

    const wrapper = component.find('.confirm-create-event-button');
    wrapper.simulate('click');

    expect(spyCreateEvent).toHaveBeenCalledTimes(1);
    expect(spyHistoryReplace).toHaveBeenCalledWith('/public');
  });

  it('should back to page after click back button', () => {
    const spyHistoryPush = jest.spyOn(history, 'goBack').mockImplementation((path) => { });

    const component = mount(eventCreate);
    const wrapper = component.find('.back');

    wrapper.simulate('click');

    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should go to main page without logged information at localStorage', () => {
    global.localStorage.removeItem('isLogin');
    const spyHistoryPush = jest.spyOn(history, 'replace').mockImplementation((path) => { });

    const component = mount(eventCreate);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  })
});
