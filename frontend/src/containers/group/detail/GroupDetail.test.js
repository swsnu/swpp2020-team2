import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupDetail from './GroupDetail';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';
import * as groupActions from '../../../store/actions/group';
import { useParams } from 'react-router';

describe('GroupDetail', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupDetail history={history} match={{ params: { id: 1 } }} /></Provider>;
  }

  const mockedState = {
    signinedUser: 1,
    userFullInfo:{
      join_requests:[],
    },
    currGroup:{
      id:1,
      name:'test_group_name',
      description:'test_group_description',
      admin:[1],
    },
    myGroups:[],
    likeGroups:[],
  };
  
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
    const mockedState2 = {
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

    component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper=component.find('.settingsBtn');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/1/setting/profile');
  });

  it('buttons should operate correctly',()=>{
    const spyOnLikeGroup=jest.spyOn(userActions,'likeGroup')
    .mockImplementation(()=>()=>{});
    const spyOnJoinGroup=jest.spyOn(userActions,'joinGroup')
    .mockImplementation(()=>()=>{});
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();

    let component = mount(makeComponent(getMockStore(mockedState)));
    let wrappers=component.find('.btn');

    wrappers.at(0).simulate('click');
    expect(spyOnLikeGroup).toHaveBeenCalledWith(1,'add');
    wrappers.at(1).simulate('click');
    expect(spyOnJoinGroup).toHaveBeenCalledWith(1,'add');
    wrappers.at(2).simulate('click');
    let wrapper=component.find('.closeBtn');
    wrapper.simulate('click');

    const mockedState2 = {
      signinedUser: 1,
      userFullInfo:{
        join_requests:[{id:1}],
      },
      currGroup:{
        id:1,
        name:'test_group_name',
        description:'test_group_description',
        admin:[1],
      },
      myGroups:[],
      likeGroups:[{id:1}],
    };

    component=mount(makeComponent(getMockStore(mockedState2)));
    wrappers=component.find('.btn');

    wrappers.at(0).simulate('click');
    expect(spyOnLikeGroup).toHaveBeenCalledWith(1,'remove');
    wrappers.at(1).simulate('click');
    expect(spyOnJoinGroup).toHaveBeenCalledWith(1,'remove');

    const mockedState3 = {
      signinedUser: 1,
      userFullInfo:{
        join_requests:[],
      },
      currGroup:{
        id:1,
        name:'test_group_name',
        description:'test_group_description',
        admin:[1],
      },
      myGroups:[{id:1}],
      likeGroups:[],
    };

    component=mount(makeComponent(getMockStore(mockedState3)));
    wrappers=component.find('.btn');
    
    wrappers.at(1).simulate('click');
    expect(spyOnAlert).toHaveBeenCalledWith("You already joined this group!");

    const mockedState4 = {};
    component=mount(makeComponent(getMockStore(mockedState4)));
    
    const mockedState5 = {currGroup:{}};
    component=mount(makeComponent(getMockStore(mockedState5)));
  });
});
