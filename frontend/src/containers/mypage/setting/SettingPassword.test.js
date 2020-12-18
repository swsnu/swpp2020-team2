import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import SettingPassword from './SettingPassword';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';

describe('SettingProfile', () => {
  function makeComponent(store) {
    return <Provider store={store}><SettingPassword history={history} /></Provider>;
  }

  const mockedState={
    userInfo:{id:1},
  }

  it('should render without error',()=>{
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('SettingPassword').length).toBe(1);
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
    const spyOnChangePassword = jest.spyOn(userActions, 'changePassword')
      .mockImplementation((url)=>(dispatch)=>{});

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1=component.find('.confirmBtn');
    const wrapper2=component.find('#currPassword-input');
    const wrapper3=component.find('#newPassword-input');
    const wrapper4=component.find('#confirmPassword-input');

    wrapper2.simulate('change',{target:{value:'password1'}});
    wrapper3.simulate('change',{target:{value:'password2'}});
    wrapper4.simulate('change',{target:{value:'password3'}});
    wrapper1.simulate('click');
    expect(spyOnAlert).toHaveBeenCalledWith('Please confirm your password correctly');

    wrapper4.simulate('change',{target:{value:'password2'}});
    wrapper1.simulate('click');
    expect(spyOnChangePassword).toHaveBeenCalledTimes(1);
  });

  it('should correctly toggle visibility',()=>{
    const component = mount(makeComponent(getMockStore(mockedState)));
    const instance = component.find(SettingPassword.WrappedComponent).instance();
    const wrapper = component.find('.toggle');

    expect(instance.state.revealCurrPassword).toBe(false);
    expect(instance.state.revealNewPassword).toBe(false);
    expect(instance.state.revealConfirmPassword).toBe(false);

    wrapper.at(0).simulate('click');
    expect(instance.state.revealCurrPassword).toBe(true);
    
    wrapper.at(1).simulate('click');
    expect(instance.state.revealNewPassword).toBe(true);
    
    wrapper.at(2).simulate('click');
    expect(instance.state.revealConfirmPassword).toBe(true);
  });
});