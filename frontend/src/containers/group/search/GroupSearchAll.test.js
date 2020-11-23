import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupSearchAll from './GroupSearchAll';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';
import * as groupActions from '../../../store/actions/group';

describe('GroupSearchAll', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupSearchAll history={history} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
  };

  beforeEach(() => {
    const spyOnGetUserFull = jest.spyOn(userActions, 'getUserFull')
      .mockImplementation((args) => (dispatch) => {});
    const spyOnGetAllGroup = jest.spyOn(groupActions, 'getAllGroup')
      .mockImplementation((args) => (dispatch) => {});
  });

  it('should render without error', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupSearchAll').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const mockedState2 = {
      signinedUser: 1,
    };
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();

    let component = mount(makeComponent(getMockStore(mockedState2)));
    let instance = component.find(GroupSearchAll.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState);
    expect(spyOnReplace).toHaveBeenCalledTimes(0);

    component = mount(makeComponent(getMockStore(mockedState)));
    instance = component.find(GroupSearchAll.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState2);
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
});
