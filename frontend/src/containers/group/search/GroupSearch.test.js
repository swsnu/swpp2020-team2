import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupSearch from './GroupSearch';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';

describe('GroupSearch', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupSearch history={history} match={{ params: { searchQuery: 'test_query' } }} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
    searchGroups: [],
  };

  beforeEach(() => {
    const spyOnGetUserFull = jest.spyOn(userActions, 'getUserFull')
      .mockImplementation((args) => (dispatch) => {});
  });

  it('should render without error', () => {
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupSearch').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();
      
    global.localStorage.removeItem('isLogin');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });

  it('should route to search page', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1 = component.find('.search-group-input');
    const wrapper2 = component.find('.search-button');

    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    wrapper2.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/search/test_query');

    wrapper1.simulate('change', { target: { value: '' } });
    wrapper2.simulate('click');
    expect(spyOnPush).toHaveBeenCalledTimes(1);

    wrapper1.simulate('change', { target: { value: 'test_input' } });
    wrapper2.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/search/test_input');
  });

  it('should route to create group page', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper = component.find('.create-group-button');

    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/create');
  });

  it('should show GroupBoxes', () => {
    const mockedState2 = {
      signinedUser: 1,
      userFullInfo:{
        id:1, join_requests:[],
      },
      searchGroups: [
        { id: 1, name: 'test_group_name', description: 'test_group_description' },
      ],
      likeGroups: [],
      noticeGroups: [],
      myGroups: [],
    };
    const component = mount(makeComponent(getMockStore(mockedState2)));

    expect(component.find('GroupBox').length).toBe(1);
  });
});
