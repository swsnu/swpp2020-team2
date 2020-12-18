import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupMain from './GroupMain';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';

describe('GroupMain', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupMain history={history} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
    userFullInfo:{
      join_requests:[{id:2}],
    },
    myGroups: [
      {id:1,name:'test_name1',description:'test_desc1'},
    ],
    likeGroups: [
      {id:2,name:'test_name2',description:'test_desc2'},
    ],
    nothingGroups: [
      {id:3,name:'test_name3',description:'test_desc3'},
    ],
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
    const instance = component.find(GroupMain.WrappedComponent).instance();
    instance.handleKeyPress({key:"Shift"});
    instance.handleKeyPress({key:"Enter"});
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
    const spyOnLikeGroup=jest.spyOn(userActions,'likeGroup')
    .mockImplementation(()=>()=>{});
    const spyOnJoinGroup=jest.spyOn(userActions,'joinGroup')
    .mockImplementation(()=>()=>{});
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    const spyOnPush=jest.spyOn(history,'push')
    .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupBox').length).toBe(3);
    
    let wrappers=component.find('.btn');

    wrappers.at(0).simulate('click');
    expect(spyOnLikeGroup).toHaveBeenCalledWith(1,'add');
    wrappers.at(1).simulate('click');
    expect(spyOnAlert).toHaveBeenCalledWith("You alreday joined this group!");
    wrappers.at(2).simulate('click');
    let wrapper=component.find('.closeBtn');
    wrapper.simulate('click');
    wrapper=component.find('.name').at(0);
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/details/1');
    wrappers.at(3).simulate('click');
    expect(spyOnLikeGroup).toHaveBeenCalledWith(2,'remove');
    wrappers.at(4).simulate('click');
    expect(spyOnJoinGroup).toHaveBeenCalledWith(2,'remove');
    wrappers.at(7).simulate('click');
    expect(spyOnJoinGroup).toHaveBeenCalledWith(3,'add');
  });
});
