import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Main from './Main';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';

import * as actionCreators from '../../store/actions/actions';

describe('Main', () => {
  function makeComponent(store) {
    return <Provider store={store}><Main history={history} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
  };

  it('should render without error', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('Main').length).toBe(1);
  });

  it('should work properly with ID and password input', () => {
    const spyOnSignin = jest.spyOn(actionCreators, 'signIn')
      .mockImplementation((args) => (dispatch) => {});
    const spyOnAlert = jest.spyOn(window, 'alert')
      .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1 = component.find('#signin-button');
    const wrapper2 = component.find('#username-input');
    const wrapper3 = component.find('#password-input');

    wrapper2.simulate('change', { target: { value: 'abcd' } });
    wrapper1.simulate('click');
    expect(spyOnSignin).toHaveBeenCalledTimes(0);
    expect(spyOnAlert).toHaveBeenCalledTimes(1);

    wrapper2.simulate('change', { target: { value: '' } });
    wrapper3.simulate('change', { target: { value: 'abcd' } });
    wrapper1.simulate('click');
    expect(spyOnSignin).toHaveBeenCalledTimes(0);
    expect(spyOnAlert).toHaveBeenCalledTimes(2);

    wrapper2.simulate('change', { target: { value: 'abcd' } });
    wrapper3.simulate('change', { target: { value: 'abcd' } });
    wrapper1.simulate('click');
    expect(spyOnSignin).toHaveBeenCalledTimes(1);
    expect(spyOnAlert).toHaveBeenCalledTimes(2);
  });

  it('should redirect to /public page when logined', () => {
    const mockedState2 = {
      signinedUser: { username: 'test_name' },
    };
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();

    let component = mount(makeComponent(getMockStore(mockedState)));
    let instance = component.find(Main.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState2);
    expect(spyOnReplace).toHaveBeenCalledTimes(0);

    component = mount(makeComponent(getMockStore(mockedState2)));
    instance = component.find(Main.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState);
    expect(spyOnReplace).toHaveBeenCalledWith('/public');
  });

  it('should route to signup page when link is clicked', () => {
    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper = component.find('span');
    wrapper.simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/signup');
  });
});
