import React from 'react';
import { mount } from 'enzyme';
import SideBar from './ListView';

const mockClick = jest.fn();

describe('<ListView />', () => {
  beforeEach(() => {
  });

  it('should render ListView', () => {
    const event = {
      id: 1,
      title: 'hi',
      group: { name: 'his' },
      date: '1111',
      likes: [1],
      brings: [1, 2],
    };
    const event2 = {
      id: 2,
      title: 'hi2',
      group: { name: 'his' },
      date: '1112',
      likes: [1, 2, 3],
      brings: [1, 2],
    };
    const listview = (
      <SideBar
        onClickDetailEvent={mockClick}
        monthEventList={[event, event2]}
      />
    );

    const component = mount(listview);
    const wrapper = component.find('.ListView');
    expect(wrapper.length).toBe(1);

    const wrapper2 = component.find('.board_content0');
    expect(wrapper2.length).toBe(1);
    wrapper2.simulate('click');
  });
});
