import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupDetail from './GroupDetail';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';
import * as groupActions from '../../../store/actions/group';

describe('GroupDetail', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupDetail history={history} match={{ params: { id: 1 } }} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
  };

  beforeEach(() => {
    const spyOnGetUserFull = jest.spyOn(userActions, 'getUserFull')
      .mockImplementation((args) => (dispatch) => {});
    const spyOnGetGroup = jest.spyOn(groupActions, 'getGroup')
      .mockImplementation((args) => (dispatch) => {});
  });

  it('should render without error', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupDetail').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const mockedState2 = {
      signinedUser: 1,
    };
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();

    let component = mount(makeComponent(getMockStore(mockedState2)));
    let instance = component.find(GroupDetail.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState);
    expect(spyOnReplace).toHaveBeenCalledTimes(0);

    component = mount(makeComponent(getMockStore(mockedState)));
    instance = component.find(GroupDetail.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState2);
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });
});
