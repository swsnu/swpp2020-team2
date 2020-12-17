import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupMain from './GroupMain';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as actionCreators from '../../../store/actions/user';

describe('GroupMain', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupMain history={history} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
    myGroups: [],
    likeGroups: [],
    noticeGroups: [],
    nothingGroups: [],
  };

  it('should render without error', () => {
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupMain').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();

    global.localStorage.removeItem('isLogin');
    let component = mount(makeComponent(getMockStore(mockedState)));
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });

  it('should route to search page', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1 = component.find('.search-group-input');
    const wrapper2 = component.find('.search-button');

    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    wrapper2.simulate('click');
    expect(spyOnPush).toHaveBeenCalledTimes(0);

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

  it('should route to all groups page', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper = component.find('.search-all-button');

    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/search');
  });

  it('should show GroupBoxes', () => {
    const mockedState2 = {
      signinedUser: 1,
      myGroups: [
        { id: 1, name: 'test_group_name', description: 'test_group_description' },
      ],
      likeGroups: [],
      noticeGroups: [],
      nothingGroups: [],
    };
    const component = mount(makeComponent(getMockStore(mockedState2)));

    expect(component.find('GroupBox').length).toBe(1);
  });
});
