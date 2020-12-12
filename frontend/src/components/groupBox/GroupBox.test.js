import React from 'react';
import { mount } from 'enzyme';

import GroupBox from './GroupBox';

describe('GroupSearchAll', () => {
  it('should render without error', () => {
    const component = mount(<GroupBox />);
    expect(component.find('GroupBox').length).toBe(1);
  });

  it('buttons should work properly', () => {
    const mockedLike = jest.fn();
    const mockedNotice = jest.fn();
    const mockedReport = jest.fn();
    const component = mount(<GroupBox like={() => mockedLike()} notice={() => mockedNotice()} report={() => mockedReport()} />);
    const wrappers = component.find('.btn');

    wrappers.at(0).simulate('click');
    expect(mockedLike).toHaveBeenCalledTimes(1);
    wrappers.at(1).simulate('click');
    expect(mockedNotice).toHaveBeenCalledTimes(1);
    wrappers.at(2).simulate('click');
    expect(mockedReport).toHaveBeenCalledTimes(1);
  });
});
