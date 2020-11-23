import React from 'react';
import { mount } from 'enzyme';

import GroupBox from './GroupBox';

describe('GroupSearchAll', () => {
  it('should render without error', () => {
    const component = mount(<GroupBox />);
    expect(component.find('GroupBox').length).toBe(1);
  });
});
