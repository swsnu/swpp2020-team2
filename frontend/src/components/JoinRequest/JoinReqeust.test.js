import React from 'react';
import { mount } from 'enzyme';

import JoinRequest from './JoinRequest';

describe('JoinRequest', () => {
  it('should render without error', () => {
    const component = mount(<JoinRequest />);
    expect(component.find('JoinRequest').length).toBe(1);
  });

  it('buttons should work properly', () => {
    const mockedAccept = jest.fn();
    const mockedReject = jest.fn();
    const component1 = mount(<JoinRequest lastName={'last_name'} firstName={'first_name'} email={'email'} department={'dept'} accept={true} clickAccept={()=>mockedAccept()} reject={true} clickReject={()=>mockedReject()} />);
    const component2 = mount(<JoinRequest lastName={'last_name'} firstName={'first_name'} email={'email'} department={'dept'} accept={false} clickAccept={()=>mockedAccept()} reject={false} clickReject={()=>mockedReject()} />);

    const wrappers = component1.find('.btn');
    wrappers.at(0).simulate('click');
    expect(mockedAccept).toHaveBeenCalledTimes(1);
    wrappers.at(1).simulate('click');
    expect(mockedReject).toHaveBeenCalledTimes(1);
  });
});
