import React from 'react';
import { mount } from 'enzyme';

import ManageMember from './ManageMember';

describe('ManageMember', () => {
  it('should render without error', () => {
    const component = mount(<ManageMember />);
    expect(component.find('ManageMember').length).toBe(1);
  });

  it('buttons should work properly', () => {
    const mockedAdmin = jest.fn();
    const mockedExpel = jest.fn();
    const component1 = mount(<ManageMember lastName={'last_name'} firstName={'first_name'} email={'email'} department={'dept'} admin={true} clickAdmin={()=>mockedAdmin()} expel={true} clickExpel={()=>mockedExpel()} />);
    const component2 = mount(<ManageMember lastName={'last_name'} firstName={'first_name'} email={'email'} department={'dept'} admin={false} clickAdmin={()=>mockedAdmin()} expel={false} clickExpel={()=>mockedExpel()} />);

    const wrappers = component1.find('.btn');
    wrappers.at(0).simulate('click');
    expect(mockedAdmin).toHaveBeenCalledTimes(1);
    wrappers.at(1).simulate('click');
    expect(mockedExpel).toHaveBeenCalledTimes(1);
  });
});
