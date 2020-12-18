import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from 'history';
import EventModify from './EventModify';

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
  target: {
    id: 1,
    title: 'TEST_TITLE1',
    group: {
      id: 1,
      name: 'TEST_GROUP1',
    },
    content: 'TEST_CONTENT',
    place: 'TEST_PLACE1',
    begin_time: '09:00',
    end_time: '14:00',
    category: {
      id: 1,
      name: 'TEST_CATEGORY',
    },
    date: '2020-12-18',
    last_editor: {
      name: 'TEST_EDITOR_NAME',
      department: 'TEST_EDITOR_DEPT',
    },
    image: [
      {
        image_file_url: 'TEST_IMAGE'
      }
    ],
    tag: [
      {
        id: 1,
        name: 'TEST_TAG1'
      },
      {
        id: 2,
        name: 'TEST_TAG2'
      }
    ]
  }
}

const mockStore = getMockStore(stubInitialState);

describe('<EventModify />', () => {
  let eventModify, spyGetEvent, spyGetUser, spyGetCategory, spyGetMyGroup;

  const history = createBrowserHistory();

  beforeEach(() => {
    global.localStorage.setItem('isLogin', 'true');
    eventModify = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact render={() => <EventModify match={{ params: { event_id: 1 } }} history={history} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest.spyOn(userActions, 'getUser').mockImplementation(() => (dispatch) => { });
    spyGetEvent = jest.spyOn(eventActions, 'getEvent').mockImplementation((id) => (dispatch) => { });
    spyGetCategory = jest.spyOn(otherActions, 'getCategories').mockImplementation(() => (dispatch) => { });
    spyGetMyGroup = jest.spyOn(groupActions, 'getMyGroup').mockImplementation((id) => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render eventModify without errors', () => {
    const component = mount(eventModify);
    const wrapper = component.find('.EventModify');
    expect(wrapper.length).toBe(1);
  });

  it(`should set state properly on title input`, () => {
    const newTitle = 'TEST_MODIFY_TITLE'
    const component = mount(eventModify);
    const wrapper = component.find('.event-title-input');
    wrapper.simulate('change', { target: { value: newTitle } });

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.title).toEqual(newTitle);
  });

  it(`should set state properly on content input`, () => {
    const newContent = 'TEST_MODIFY_CONTENT'
    const component = mount(eventModify);
    const wrapper = component.find('.event-content-input');
    wrapper.simulate('change', { target: { value: newContent } });

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.content).toEqual(newContent);
  });

  it(`should set state properly on place input`, () => {
    const newPlace = 'TEST_MODIFY_PLACE'
    const component = mount(eventModify);
    const wrapper = component.find('.event-place-input');
    wrapper.simulate('change', { target: { value: newPlace } });

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.place).toEqual(newPlace);
  });

  it(`should set state properly on category input`, () => {
    const newCategory = 2;
    const component = mount(eventModify);
    const wrapper = component.find('.event-category-input');
    wrapper.simulate('change', { target: { value: newCategory } });

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.category).toEqual(newCategory);
  });

  it(`should set state properly on group input`, () => {
    const newGroup = 2;
    const component = mount(eventModify);
    const wrapper = component.find('.event-group-input');
    wrapper.simulate('change', { target: { value: newGroup } });

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.group).toEqual(newGroup);
  });

  it(`should set state properly on begin_time input`, () => {
    const newBegin_time = '12:00'
    const component = mount(eventModify);
    const wrapper = component.find('.event-begin_time-input');
    wrapper.simulate('change', { target: { value: newBegin_time } });

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.begin_time).toEqual(newBegin_time);
  });

  it(`should set state properly on end_time input`, () => {
    const newEnd_time = '13:00'
    const component = mount(eventModify);
    const wrapper = component.find('.event-end_time-input');
    wrapper.simulate('change', { target: { value: newEnd_time } });

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.end_time).toEqual(newEnd_time);
  });

  it(`should set selectedTag after clicking tag`, () => {
    const component = mount(eventModify);
    const wrapper = component.find('.addTag');
    wrapper.simulate('click');

    const wrapper2 = component.find('.UnSelected').at(0);
    wrapper2.simulate('click');

    const eventModifyInstance = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance.state.selectTags).toContain(1);

    const wrapper3 = component.find('.Selected').at(0);
    wrapper3.simulate('click');
    const eventModifyInstance2 = component.find(EventModify.WrappedComponent).instance();
    expect(eventModifyInstance2.state.selectTags.length).toBe(0);
  });

  it(`should recommend tag after clicking btn with content input`, () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => null);
    const spyGetTagRecommend = jest.spyOn(eventActions, 'getTagRecommend').mockImplementation((content) => { return dispatch => { }; });
    const component = mount(eventModify);
    const wrapper = component.find('.addTag');
    wrapper.simulate('click');

    expect(spyGetTagRecommend).toHaveBeenCalledTimes(1);

    stubInitialState.target.content = "";
    const component2 = mount(eventModify);
    const wrapper2 = component2.find('.addTag');
    wrapper2.simulate('click');

    expect(spyAlert).toHaveBeenCalledTimes(1);
  });
  /*
  it(`should change tags after changing recommends`, () => {
    const component = mount(eventModify);

    stubInitialState.tagRecommend = [{id:3,name:'TEST3'}]
    const InstanceTags = (component.find(EventModify.WrappedComponent).instance()).state.tags;
  
    InstanceTags.length().toBe(1);
  });
*/

  it(`should call 'modifyEvent' and go to public after Modifying`, () => {
    const spyHistoryReplace = jest.spyOn(history, 'replace').mockImplementation(path => { });
    const spyPostEvent = jest.spyOn(eventActions, 'modifyEvent').mockImplementation((event) => { return dispatch => { }; });
    const spyConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => true);

    const component = mount(eventModify);
    const wrapper = component.find('.confirm-modify-event-button');
    wrapper.simulate('click');

    expect(spyPostEvent).toHaveBeenCalledTimes(1);
    expect(spyConfirm).toHaveBeenCalledTimes(1);
    expect(spyHistoryReplace).toHaveBeenCalledWith('/public');
  });

  it('should confirm-No during modifying & deleting', () => {
    const spyHistoryReplace = jest.spyOn(history, 'replace').mockImplementation(path => { });
    const spyConfirm_No = jest.spyOn(window, 'confirm').mockImplementation(() => false);

    const component = mount(eventModify);

    const wrapper = component.find('.confirm-modify-event-button');
    wrapper.simulate('click');
    expect(spyHistoryReplace).toHaveBeenCalledTimes(0);

    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(path => { });
    const wrapper2 = component.find('.delete-event-button');
    wrapper2.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledTimes(0);
  });

  it('should back to page after click back button', () => {
    const spyHistoryPush = jest.spyOn(history, 'goBack').mockImplementation((path) => { });

    const component = mount(eventModify);
    const wrapper = component.find('.back');

    wrapper.simulate('click');

    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it(`should call Confirm-Yes 'deleteModify'`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(path => { });
    const spyConfirm = jest.spyOn(window, 'confirm').mockImplementation(() => true);
    const spyDeleteEvent = jest.spyOn(eventActions, 'deleteEvent').mockImplementation((id) => { return dispatch => { }; });

    const component = mount(eventModify);
    const wrapper = component.find('.delete-event-button');
    wrapper.simulate('click');

    expect(spyDeleteEvent).toHaveBeenCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith('/public');
  });

  it('should go to main page without logged information at localStorage', () => {
    global.localStorage.removeItem('isLogin');
    const spyHistoryPush = jest.spyOn(history, 'replace').mockImplementation((path) => { });

    const component = mount(eventModify);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  })
});
