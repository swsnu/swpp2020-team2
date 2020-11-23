import React from 'react';
import { mount } from 'enzyme';
import TopBar from './TopBar';

import { history } from '../../store/store';

describe('<TopBar />', () => {
  function makeComponent(tabNum) {
    return <TopBar history={history} tabNum={tabNum} />;
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
});
