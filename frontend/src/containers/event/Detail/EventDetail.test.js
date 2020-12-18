import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter, connectRouter } from 'connected-react-router';
import { history, middlewares } from '../../../store/store';
import EventDetail from './EventDetail';

import getMockStore from '../../../test-utils/mocks';

import { createBrowserHistory } from 'history';

import * as userActions from '../../../store/actions/user';
import * as eventActions from '../../../store/actions/events';

jest.mock('../../../components/Report/ReportEvent', () => { // reportModal component mocking
  return jest.fn(props => {
    return (
      <div className="spyReportEvent">
        <button className={'closeBtn'} onClick={props.onClickCloseModal}>X</button>
      </div>);
  });
});

let stubInitialState = {
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
    date: new Date(),
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
        name: 'TEST_TAG1'
      }
    ]
  },
  likeEvents: [1],
  bringEvents: [2],
  userFullInfo: {
    members: [1]
  }
};

const mockStore = getMockStore(stubInitialState);

describe('<EventDetail />', () => {

  let eventDetail, spyGetUser, spyGetEvent;

  const history = createBrowserHistory();

  beforeEach(() => {
    global.localStorage.setItem('isLogin', 'true');
    eventDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact render={() => <EventDetail match={{ params: { event_id: 1 } }} history={history} />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest.spyOn(userActions, 'getUserFull').mockImplementation(() => (dispatch) => { });
    spyGetEvent = jest.spyOn(eventActions, 'getEvent').mockImplementation((id) => (dispatch) => { });
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should render eventDetail without error', () => {
    const component = mount(eventDetail);
    const wrapper = component.find('.EventDetail');
    expect(wrapper.length).toBe(1);

    for (let i = 2; i < 9; i++) {
      stubInitialState.target.category.id = i
      const component = mount(eventDetail);
      const wrapper = component.find('.EventDetail');
      expect(wrapper.length).toBe(1);
    }
  });

  it('should back to page after click back button', () => {
    const spyHistoryPush = jest.spyOn(history, 'goBack').mockImplementation((path) => { });

    const component = mount(eventDetail);
    const wrapper = component.find('.back');

    wrapper.simulate('click');

    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  });

  it('should bring active after click bring button', () => {
    const spyBringEvent = jest.spyOn(userActions, 'bringEvent').mockImplementation((id, op) => (dispatch) => { });

    stubInitialState.bringEvents = [];
    const component = mount(eventDetail);
    const wrapper = component.find('.bringEvent');
    expect(wrapper.length).toBe(1);

    wrapper.simulate('click');
    expect(spyBringEvent).toHaveBeenCalledTimes(1);
  });

  it('should bring deactive after click bring button', () => {
    const spyBringEvent = jest.spyOn(userActions, 'bringEvent').mockImplementation((id, op) => (dispatch) => { });

    stubInitialState.bringEvents = [1];
    const component = mount(eventDetail);
    const wrapper = component.find('.bringEvent');
    expect(wrapper.length).toBe(1);

    wrapper.simulate('click');
    expect(spyBringEvent).toHaveBeenCalledTimes(1);
  });

  it('should like active after click like button', () => {
    const spyLikeEvent = jest.spyOn(userActions, 'likeEvent').mockImplementation((id, op) => (dispatch) => { });

    stubInitialState.likeEvents = [];
    const component = mount(eventDetail);
    const wrapper = component.find('.likeEvent');
    expect(wrapper.length).toBe(1);
    wrapper.simulate('click');
    expect(spyLikeEvent).toHaveBeenCalledTimes(1);
  });

  it('should like deactive after click like button', () => {
    const spyLikeEvent = jest.spyOn(userActions, 'likeEvent').mockImplementation((id, op) => (dispatch) => { });
    stubInitialState.likeEvents = [1];
    const component = mount(eventDetail);
    const wrapper = component.find('.likeEvent');
    expect(wrapper.length).toBe(1);

    wrapper.simulate('click');
    expect(spyLikeEvent).toHaveBeenCalledTimes(1);
  });

  it('should modal active after click report button', () => {
    const component = mount(eventDetail);
    const wrapper = component.find('.reportEvent');
    expect(wrapper.length).toBe(1);

    const modalInstance = component.find(EventDetail.WrappedComponent).instance();
    wrapper.simulate('click');
    expect(modalInstance.state.modalBool).toEqual(true);

    wrapper.simulate('click');
    expect(modalInstance.state.modalBool).toEqual(false);
  });

  it(`should report successfully at the reportModal`, () => {
    const component = mount(eventDetail);

    const modalInstance = component.find(EventDetail.WrappedComponent).instance();
    const wrapper = component.find('.reportEvent');
    wrapper.simulate('click');
    expect(modalInstance.state.modalBool).toEqual(true);

    const wrapper2 = component.find('.spyReportEvent .closeBtn');
    wrapper2.simulate('click');
    expect(modalInstance.state.modalBool).toEqual(false);
  });


  it(`should render 'modifyEvent' when user is a member of the event's group`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push').mockImplementation(path => { });
    const component = mount(eventDetail);
    const wrapper = component.find('.ModifyEvent');

    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/details/modify/1/');
  });

  it(`should alert when user is not a member of the event's group`, () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => null);
    stubInitialState.userFullInfo.members = [2];
    const component = mount(eventDetail);
    const wrapper = component.find('.ModifyEvent');

    wrapper.simulate('click');
    expect(spyAlert).toHaveBeenCalledTimes(1);
  });

  it('should render eventDetail without error if there is no data', () => {
    stubInitialState.target = {}
    const component = mount(eventDetail);
    const wrapper = component.find('.EventDetail');
    expect(wrapper.length).toBe(1);
  });

  it('should go to main page without logged information at localStorage',()=>{
    global.localStorage.removeItem('isLogin');
    const spyHistoryPush = jest.spyOn(history, 'replace').mockImplementation((path) => { });

    const component = mount(eventDetail);
    expect(spyHistoryPush).toHaveBeenCalledTimes(1);
  })
});
