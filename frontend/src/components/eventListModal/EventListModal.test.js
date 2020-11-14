import React from 'react';
import { shallow, mount } from 'enzyme';
import EventListModal from './EventListModal';

describe('<EventListModal />', () => {
    
    it('should render without errors', () => {
        const component = mount(<EventListModal day="2020. 11. 14. SAT"/>);
        const wrapper = component.find('.EventListModal');
        expect(wrapper.length).toBe(1);
    });
    
});
