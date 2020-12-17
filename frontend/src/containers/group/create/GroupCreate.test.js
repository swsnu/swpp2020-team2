import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import GroupCreate from './GroupCreate';
import getMockStore from '../../../test-utils/mocks';
import { history } from '../../../store/store';

import * as actionCreators from '../../../store/actions/group';

describe('GroupCreate', () => {
  function makeComponent(store) {
    return <Provider store={store}><GroupCreate history={history} /></Provider>;
  }

  const mockedState = {
    currGroup: {id:1},
  };

  it('should render without error', () => {
    global.localStorage.setItem('isLogin','true');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('GroupCreate').length).toBe(1);
  });

  it('should redirect to main page when sign outed', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();

    global.localStorage.removeItem('isLogin');
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(spyOnReplace).toHaveBeenCalledWith('/main');
  });

  it('should call create group correctly', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1 = component.find('#group-name-input');
    const wrapper2 = component.find('#group-description-input');
    const wrapper3 = component.find('#create-group-button');

    const spyOnCreateGroup = jest.spyOn(actionCreators, 'createGroup')
      .mockImplementation((args) => (dispatch) => {});
    const spyOnAlert = jest.spyOn(window, 'alert')
      .mockImplementation();

    wrapper3.simulate('click');
    expect(spyOnCreateGroup).toHaveBeenCalledTimes(0);
    expect(spyOnAlert).toHaveBeenCalledTimes(1);

    wrapper1.simulate('change', { target: { value: 'test_name_input' } });
    wrapper2.simulate('change', { target: { value: 'test_description_input' } });
    wrapper3.simulate('click');
    expect(spyOnCreateGroup).toHaveBeenCalledTimes(1);
  });

  it('should route to group detail page when group is created', (done) => {
    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1 = component.find('#group-name-input');
    const wrapper2 = component.find('#group-description-input');
    wrapper1.simulate('change', { target: { value: 'test_name_input' } });
    wrapper2.simulate('change', { target: { value: 'test_description_input' } });

    const instance = component.find(GroupCreate.WrappedComponent).instance();
    instance.onCreateHandler().then(()=>{
      expect(spyOnPush).toHaveBeenCalledWith('/group/details/1');
      done();
    });
  });
});
