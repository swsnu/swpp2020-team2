import React from 'react';
import { mount } from 'enzyme';

import GroupBox from './GroupBox';

describe('GroupBox', () => {
  it('should render without error', () => {
    const component = mount(<GroupBox />);
    expect(component.find('GroupBox').length).toBe(1);
  });

  it('buttons should work properly', () => {
    const mockedDetail = jest.fn();
    const mockedLike = jest.fn();
    const mockedJoin = jest.fn();
    const mockedReport = jest.fn();
    const component1 = mount(<GroupBox detail={()=>mockedDetail()} liked={true} like={() => mockedLike()} joined={true} joinRequested={false} join={()=>mockedJoin()} report={() => mockedReport()} />);
    const component2 = mount(<GroupBox detail={()=>mockedDetail()} liked={true} like={() => mockedLike()} joined={false} joinRequested={true} join={()=>mockedJoin()} report={() => mockedReport()} />);
    const component3 = mount(<GroupBox detail={()=>mockedDetail()} liked={true} like={() => mockedLike()} joined={false} joinRequested={false} join={()=>mockedJoin()} report={() => mockedReport()} />);
    
    const wrapper=component1.find('.name');
    wrapper.simulate('click');
    expect(mockedDetail).toHaveBeenCalledTimes(1);

    const wrappers = component1.find('.btn');
    wrappers.at(0).simulate('click');
    expect(mockedLike).toHaveBeenCalledTimes(1);
    wrappers.at(1).simulate('click');
    expect(mockedJoin).toHaveBeenCalledTimes(1);
    wrappers.at(2).simulate('click');
    expect(mockedReport).toHaveBeenCalledTimes(1);
  });
});
