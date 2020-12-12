import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import TopBar from './TopBar';

import getMockStore from '../../test-utils/mocks';
import { history } from '../../store/store';

describe('<TopBar />', () => {
  function makeComponent(tabNum) {
    const mockedState = {};
    return <Provider store={getMockStore(mockedState)}><TopBar history={history} tabNum={tabNum} /></Provider>;
  }

  it('should render Top Bar', () => {
    let component = mount(makeComponent(0));
    component = mount(makeComponent(1));
    component = mount(makeComponent(2));
    const wrapper = component.find('.TopBar');
    expect(wrapper.length).toBe(1);

    const wrapperTab = component.find('.tab');
    expect(wrapperTab.length).toBe(3);
  });

  it('should call history.push when buttons clicked', () => {
    const component = mount(makeComponent(0));
    const wrappers = component.find('.tab');
    const spyOnPush = jest.spyOn(history, 'push')
      .mockImplementation();

    wrappers.at(0).simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/public');

    wrappers.at(1).simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/public');

    wrappers.at(2).simulate('click');
    expect(spyOnPush).toHaveBeenCalledWith('/group');
  });

  it('should show/hide profileModal', () => {
    const component = mount(makeComponent(0));
    const wrapper = component.find('.profile');

    wrapper.simulate('click');
    expect(component.find('ProfileModal').length).toBe(1);
  });
});
