import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupPrivacy from './GroupPrivacy';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as groupActions from '../../../store/actions/group';

describe('GroupPrivacy', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupPrivacy history={history} match={{ params: { id: 1 } }} /></Provider>;
  }

  const mockedState={
    currGroup:{
      privacy:1,
    },
  }

  it('should render without error',()=>{
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupPrivacy').length).toBe(1);
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
    let wrapper=component.find('.groupPageBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/details/1');
    
    wrapper=component.find('.profileBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/1/setting/profile');
    
    wrapper=component.find('.membersBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/1/setting/members');
    
    wrapper=component.find('.privacyBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/1/setting/privacy');
  });

  it('should confirm correctly',()=>{
    const spyOnChangeGroupPrivacy=jest.spyOn(groupActions,'changeGroupPrivacy')
    .mockImplementation(()=>()=>{});

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1=component.find('.confirmBtn');
    const wrapper2=component.find('#privacy-input');

    wrapper2.simulate('change',{target:{value:2}});
    wrapper1.simulate('click');
    expect(spyOnChangeGroupPrivacy).toHaveBeenCalledWith(1,2);
  });
});