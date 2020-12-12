import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Signup from './Signup';
import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';

import * as actionCreators from '../../store/actions/user';

describe('Signup', () => {
  function makeComponent(store) {
    return <Provider store={store}><Signup history={history} /></Provider>;
  }

  const mockedState = {
    signinedUser: null,
    universities: [],
    departments: [],
  };

  it('should render without error', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    expect(component.find('Signup').length).toBe(1);
  });

  it('should deal with various inputs', () => {
    const spyOnSignup = jest.spyOn(actionCreators, 'signUp')
      .mockImplementation((args) => (dispatch) => {});
    jest.spyOn(window, 'alert')
      .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper1 = component.find('#username-input');
    const wrapper2 = component.find('#password-input');
    const wrapper3 = component.find('#pwConfirm-input');
    const wrapper4 = component.find('#university-input');
    const wrapper5 = component.find('#department-input');
    const wrapper6 = component.find('#email-input');
    const wrapper7 = component.find('#firstName-input');
    const wrapper8 = component.find('#lastName-input');
    const wrapper9 = component.find('#signup-button');

    wrapper9.simulate('click');
    expect(spyOnSignup).toHaveBeenCalledTimes(0);

    wrapper1.simulate('change', { target: { value: 'test_username@' } });
    wrapper2.simulate('change', { target: { value: 'test_password' } });
    wrapper3.simulate('change', { target: { value: 'test_password_confirm' } });
    wrapper4.simulate('change', { target: { selectedIndex: 1 } });
    wrapper5.simulate('change', { target: { selectedIndex: 1 } });
    wrapper6.simulate('change', { target: { value: 'test_email' } });
    wrapper7.simulate('change', { target: { value: 'test_firstname' } });
    wrapper8.simulate('change', { target: { value: 'test_lastname' } });
    wrapper9.simulate('click');
    expect(spyOnSignup).toHaveBeenCalledTimes(0);

    wrapper1.simulate('change', { target: { value: 'test_username' } });
    wrapper9.simulate('click');
    expect(spyOnSignup).toHaveBeenCalledTimes(0);

    wrapper3.simulate('change', { target: { value: 'test_password' } });
    wrapper9.simulate('click');
    expect(spyOnSignup).toHaveBeenCalledTimes(0);

    wrapper6.simulate('change', { target: { value: 'test_email@snu.ac.kr' } });
    wrapper9.simulate('click');
    expect(spyOnSignup).toHaveBeenCalledTimes(0);

    wrapper7.simulate('change', { target: { value: 'testfirstname' } });
    wrapper9.simulate('click');
    expect(spyOnSignup).toHaveBeenCalledTimes(0);

    wrapper8.simulate('change', { target: { value: 'testlastname' } });
    wrapper9.simulate('click');
    expect(spyOnSignup).toHaveBeenCalledTimes(1);
  });

  it('should redirect to public calendar page when signined', () => {
    const spyOnReplace = jest.spyOn(history, 'replace')
      .mockImplementation();
    const mockedState2 = {
      signinedUser: { username: 'test' },
      universities: [{ id: 1, name: 'test_univ' }],
      departments: [{ id: 1, name: 'test_dept' }],
    };

    let component = mount(makeComponent(getMockStore(mockedState)));
    let instance = component.find(Signup.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState2);
    expect(spyOnReplace).toHaveBeenCalledTimes(0);

    component = mount(makeComponent(getMockStore(mockedState2)));
    instance = component.find(Signup.WrappedComponent).instance();
    instance.componentDidUpdate(mockedState);
    expect(spyOnReplace).toHaveBeenCalledWith('/public');
  });

  it('should call history.back when almanac is clicked', () => {
    const spyOnBack = jest.spyOn(history, 'goBack')
      .mockImplementation();

    const component = mount(makeComponent(getMockStore(mockedState)));
    const wrapper = component.find('.title');
    wrapper.simulate('click');
    expect(spyOnBack).toHaveBeenCalledTimes(1);
  });

  it('should toggle password visibility', () => {
    const component = mount(makeComponent(getMockStore(mockedState)));
    const instance = component.find(Signup.WrappedComponent).instance();
    const wrappers = component.find('.toggle');

    wrappers.at(0).simulate('click');
    expect(instance.state.revealPassword).toBe(true);
    wrappers.at(1).simulate('click');
    expect(instance.state.revealConfirmPassword).toBe(true);
  });
});
