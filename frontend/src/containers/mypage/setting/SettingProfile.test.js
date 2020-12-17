import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import SettingProfile from './SettingProfile';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';
import * as otherActions from '../../../store/actions/other';

describe('SettingProfile', () => {
  function makeComponent(store) {
    return <Provider store={store}><SettingProfile history={history} /></Provider>;
  }

  beforeEach(() => {
    const spyOnGetUser = jest.spyOn(userActions, 'getUser')
      .mockImplementation((args) => (dispatch) => {});
    const spyOnGetDepartments = jest.spyOn(otherActions, 'getDepartments')
      .mockImplementation((args) => (dispatch) => {});
  });

  const mockedState = {
    signinedUser: 1,
    userInfo: {
      first_name: 'test_first_name', last_name: 'test_last_name', username: 'test_username', university: { id: 1, name: 'test_university' }, department: { id: 1, name: 'test_department' }, email: 'test_email'
    },
    departments: [{ id: 1, name: 'test_department' }],
  };

  it('should render without error', () => {
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('SettingProfile').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();
      
    global.localStorage.removeItem('isLogin');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });

  it('should route to other pages', () => {
    const spyOnPush=jest.spyOn(history,'push')
    .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    let wrapper=component.find('.myPageBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/mypage');
    
    wrapper=component.find('.profileBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/mypage/setting/profile');
    
    wrapper=component.find('.passwordBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/mypage/setting/password');
    
    wrapper=component.find('.preferenceBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/mypage/setting/preference');
  });

  it('should confirm correctly',()=>{
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    const spyOnChangeUserInfo = jest.spyOn(userActions, 'changeUserInfo')
      .mockImplementation(()=>()=>{});

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1=component.find('.confirmBtn');
    const wrapper2=component.find('#firstname-input');
    
    wrapper2.simulate('change',{target:{value:''}});
    wrapper1.simulate('click');
    expect(spyOnAlert).toHaveBeenCalledWith('You should fill names!');

    wrapper2.simulate('change',{target:{value:'first_name'}});
    wrapper1.simulate('click');
    expect(spyOnChangeUserInfo).toHaveBeenCalledTimes(1);
    expect(spyOnAlert).toHaveBeenCalledWith('Setting has been applied!');
  });
});
