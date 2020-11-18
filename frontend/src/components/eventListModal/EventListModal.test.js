import React from 'react';
import { shallow, mount } from 'enzyme';
import EventListModal from './EventListModal';

describe('<EventListModal />', () => {
  it('should render without errors', () => {
    const component = shallow(<EventListModal />);
    const wrapper = component.find('.EventListModal');
    expect(wrapper.length).toBe(1);
  });

  it('should close modal after button', () => {
    const component = shallow(<EventListModal onClickCloseModal={() => {}} />);
    const wrapper = component.find('.closeButton');
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });

  it('should redirect to create page after click the button', () => {
    const component = shallow(<EventListModal onClickCreateEvent={(day) => {}} />);
    const wrapper = component.find('.createEventButton');
    wrapper.simulate('click');
    expect(wrapper.length).toBe(1);
  });
});
