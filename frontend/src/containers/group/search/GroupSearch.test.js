import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupSearch from './GroupSearch';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as userActions from '../../../store/actions/user';

describe('GroupSearch', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupSearch history={history} match={{ params: { searchQuery: 'test_query' } }} /></Provider>;
  }

  const mockedState = {
    signinedUser: 1,
    userFullInfo:{
      join_requests:[],
    },
    searchGroups:[
      {id:1,name:'test_name',description:'test_desc'},
    ],
    myGroups:[],
    likeGroups:[],
  };

  beforeEach(() => {
    const spyOnGetUserFull = jest.spyOn(userActions, 'getUserFull')
      .mockImplementation((args) => (dispatch) => {});
  });

  it('should render without error', () => {
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupSearch').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();
      
    global.localStorage.removeItem('isLogin');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });

  it('should route to search page', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1 = component.find('.search-group-input');
    const wrapper2 = component.find('.search-button');

    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();
    
    wrapper1.simulate('change', { target: { value: '' } });
    wrapper2.simulate('click');
    expect(spyOnPush).toHaveBeenCalledTimes(0);

    wrapper1.simulate('change', { target: { value: 'test_input' } });
    const instance = component.find(GroupSearch.WrappedComponent).instance();
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

  it('should show GroupBoxes', () => {
    const spyOnLikeGroup=jest.spyOn(userActions,'likeGroup')
    .mockImplementation(()=>()=>{});
    const spyOnJoinGroup=jest.spyOn(userActions,'joinGroup')
    .mockImplementation(()=>()=>{});
    const spyOnAlert=jest.spyOn(window,'alert')
    .mockImplementation();
    const spyOnPush=jest.spyOn(history,'push')
    .mockImplementation();

    let component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupBox').length).toBe(1);

    let wrappers=component.find('.btn');

    wrappers.at(0).simulate('click');
    expect(spyOnLikeGroup).toHaveBeenCalledWith(1,'add');
    wrappers.at(1).simulate('click');
    expect(spyOnJoinGroup).toHaveBeenCalledWith(1,'add');
    wrappers.at(2).simulate('click');
    let wrapper=component.find('.closeBtn');
    wrapper.simulate('click');

    wrapper=component.find('.name');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group/details/1');

    const mockedState2 = {
      signinedUser: 1,
      userFullInfo:{
        join_requests:[{id:1}],
      },
      searchGroups:[
        {id:1,name:'test_name',description:'test_desc'},
      ],
      myGroups:[],
      likeGroups:[{id:1}],
    };

    component = mount(makeComponent(getMockStore(mockedState2)));
    wrappers=component.find('.btn');

    wrappers.at(0).simulate('click');
    expect(spyOnLikeGroup).toHaveBeenCalledWith(1,'remove');
    wrappers.at(1).simulate('click');
    expect(spyOnJoinGroup).toHaveBeenCalledWith(1,'remove');

    const mockedState3 = {
      signinedUser: 1,
      userFullInfo:{
        join_requests:[{id:2}],
      },
      searchGroups:[
        {id:1,name:'test_name',description:'test_desc'},
      ],
      myGroups:[{id:1}],
      likeGroups:[{id:1}],
    };

    component = mount(makeComponent(getMockStore(mockedState3)));
    wrappers=component.find('.btn');

    wrappers.at(1).simulate('click');
    expect(spyOnAlert).toHaveBeenCalledWith("You alreday joined this group!");
  });
});
