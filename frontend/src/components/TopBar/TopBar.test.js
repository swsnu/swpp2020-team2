import React from 'react';
import { mount } from 'enzyme';
import TopBar from './TopBar';

const mockOnClickDate = jest.fn();

describe('<TopBar />', () => {
  let topbar;
  beforeEach(() => {
    topbar = <TopBar />;
  });

  it('should render Top Bar', () => {
    const component = mount(topbar);
    const wrapper = component.find('.TopBar');
    expect(wrapper.length).toBe(1);

    const wrapperTitle = component.find('.title');
    expect(wrapperTitle.length).toBe(1);

    const wrapperActiveTab = component.find('.activeTab');
    expect(wrapperActiveTab.length).toBe(1);

    const wrapperTab = component.find('.tab');
    expect(wrapperTab.length).toBe(2);
  });
});
