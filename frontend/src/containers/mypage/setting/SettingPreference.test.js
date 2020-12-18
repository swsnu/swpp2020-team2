import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import SettingPreference from './SettingPreference';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';

describe('SettingPreference', () => {
  function makeComponent(store) {
    return <Provider store={store}><SettingPreference history={history} /></Provider>;
  }

  const mockedState={
    userFullInfo:{id:1, language:1},
    languages:[{id:1}],
  }

  it('should render without error',()=>{
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('SettingPreference').length).toBe(1);
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
    const spyOnChangeLanguage=jest.spyOn(userActions,'changeLanguage')
    .mockImplementation(()=>()=>{});
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1=component.find('.confirmBtn');
    const wrapper2=component.find('#department-input');

    wrapper2.simulate('change',{target:{value:1}});
    wrapper1.simulate('click');
    expect(spyOnChangeLanguage).toHaveBeenCalledWith(1);
    expect(spyOnAlert).toHaveBeenCalledWith('Setting has been applied!');
  });
});