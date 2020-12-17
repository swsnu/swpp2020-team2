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
    currGroup:{
      id:1,
      name:'test_group_name',
      description:'test_group_description',
      admin:[],
    }
  };

  beforeEach(() => {
    const spyOnGetUserFull = jest.spyOn(userActions, 'getUserFull')
      .mockImplementation((args) => (dispatch) => {});
    const spyOnGetGroup = jest.spyOn(groupActions, 'getGroup')
      .mockImplementation((args) => (dispatch) => {});
  });

  it('should render without error', () => {
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupDetail').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();

    global.localStorage.removeItem('isLogin');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });

  it('should have setting button only when user is admin',()=>{
    let mockedState2 = {
      signinedUser: 1,
      currGroup:{
        id:1,
        name:'test_group_name',
        description:'test_group_description',
        admin:[2,3],
      }
    };
    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    let component = mount(makeComponent(getMockStore(mockedState2)));
    expect(component.find('.settingsBtn').length).toBe(0);

    mockedState2 = {
      signinedUser: 1,
      currGroup:{
        id:1,
        name:'test_group_name',
        description:'test_group_description',
        admin:[1,2,3],
      }
    };
    component = mount(makeComponent(getMockStore(mockedState2)));
    const wrapper=component.find('.settingsBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/1/setting/profile');
  });
});
