import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupMembers from './GroupMembers';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as groupActions from '../../../store/actions/group';

describe('GroupPrivacy', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupMembers history={history} match={{ params: { id: 1 } }} /></Provider>;
  }

  const mockedState={
    signinedUser:1,
    currGroup:{
      join_requests:[
        {id:2, first_name:'first_name2', last_name: 'last_name2', email: 'email2', department:{id:2,name:'dept_name2'}},
      ],
      member:[
        {id:1, first_name:'first_name1', last_name: 'last_name1', email: 'email1', department:{id:1,name:'dept_name1'}},
        {id:3, first_name:'first_name3', last_name: 'last_name3', email: 'email3', department:{id:3,name:'dept_name3'}},
      ],
      admin:[1],
    },
  }

  it('should render without error',()=>{
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupMembers').length).toBe(1);
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
    const spyOnManageMember=jest.spyOn(groupActions,'manageMember')
    .mockImplementation(()=>()=>{});
    const spyOnHandleJoinRequest=jest.spyOn(groupActions,'handleJoinRequest')
    .mockImplementation(()=>()=>{});
    const spyOnManageAdmin=jest.spyOn(groupActions,'manageAdmin')
    .mockImplementation(()=>()=>{});
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    let instance = component.find(GroupMembers.WrappedComponent).instance();
    const wrapper=component.find('.confirmBtn');
    const wrappers=component.find('.btn');

    instance.manageMembersHandler(1,'expel');
    expect(spyOnAlert).toHaveBeenCalledWith('You cannot deauthorize/expel yourself!');

    instance.joinRequestHandler(2,'accept');
    instance.manageMembersHandler(3,'admin');
    wrapper.simulate('click');
    expect(spyOnManageMember).toHaveBeenCalledWith(1,2,'add');
    expect(spyOnHandleJoinRequest).toHaveBeenCalledWith(1,2,'remove');
    expect(spyOnManageAdmin).toHaveBeenCalledWith(1,3,'add');

    wrappers.at(0).simulate('click');
    wrappers.at(1).simulate('click');
    instance.joinRequestHandler(2,'reject');
    instance.joinRequestHandler(2,'reject');
    wrappers.at(4).simulate('click');
    wrappers.at(5).simulate('click');
    instance.manageMembersHandler(3,'expel');
    instance.manageMembersHandler(3,'expel');
    wrapper.simulate('click');
    expect(spyOnHandleJoinRequest).toHaveBeenCalledWith(1,2,'remove');
    expect(spyOnManageMember).toHaveBeenCalledWith(1,3,'remove');
  });
});