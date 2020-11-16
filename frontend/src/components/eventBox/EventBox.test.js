import React from 'react';
import { shallow, mount } from 'enzyme';
import EventBox from './EventBox';

describe('<EventBox />', () => {
    it('should render without errors', () => {
        const component = mount(<EventBox />);
        const wrapper = component.find('.EventBox');
        expect(wrapper.length).toBe(1);
    });

    it('should implement function after click', () => {
        let count = 0;
        const component = mount(<EventBox detailEvent={() => { count++ }} />);
        const wrapper = component.find('.title');
        wrapper.simulate('click');
        expect(count).toBe(1);
    });

    it('should be change bordercolor depending on category', () => {
        const component = mount(<EventBox event={{ category: { id: 0 } }}/>);
        const wrapper = component.find({style:{borderLeftColor:'red'} })
        expect(wrapper.length).toBe(1);

        const component2 = mount(<EventBox event={{ category: { id: 1 } }}/>);
        const wrapper2 = component2.find({style:{borderLeftColor:'orange'} })
        expect(wrapper2.length).toBe(1);

        const component3 = mount(<EventBox event={{ category: { id: 2 } }}/>);
        const wrapper3 = component3.find({style:{borderLeftColor:'yellow'} })
        expect(wrapper3.length).toBe(1);

        const component4 = mount(<EventBox event={{ category: { id: 3 } }}/>);
        const wrapper4 = component4.find({style:{borderLeftColor:'green'} })
        expect(wrapper4.length).toBe(1);

        const component5 = mount(<EventBox event={{ category: { id: 4 } }}/>);
        const wrapper5 = component5.find({style:{borderLeftColor:'skyblue'} })
        expect(wrapper5.length).toBe(1);

        const component6 = mount(<EventBox event={{ category: { id: 5 } }}/>);
        const wrapper6 = component6.find({style:{borderLeftColor:'blue'} })
        expect(wrapper6.length).toBe(1);

        const component7 = mount(<EventBox event={{ category: { id: 6 } }}/>);
        const wrapper7 = component7.find({style:{borderLeftColor:'purple'} })
        expect(wrapper7.length).toBe(1);

        const component8 = mount(<EventBox event={{ category: { id: 7 } }}/>);
        const wrapper8 = component8.find({style:{borderLeftColor:'gray'} })
        expect(wrapper8.length).toBe(1);
    });
});
