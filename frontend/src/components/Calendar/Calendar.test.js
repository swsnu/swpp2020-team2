import React from 'react';
import { mount } from 'enzyme';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import Calendar from './Calendar';

const sampleDate = format(new Date(), 'yyyy-MM-dd');
const sampleDate2 = format(addDays(new Date(), 15), 'yyyy-MM-dd');
const sampleDate3 = format(addDays(new Date(), 11), 'yyyy-MM-dd');
const sample = [
  {
    category: {
      id: 1,
    },
    date: sampleDate,
  },
  {
    category: {
      id: 2,
    },
    date: sampleDate,
  },
  {
    category: {
      id: 1,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 2,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 3,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 4,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 5,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 6,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 7,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 0,
    },
    date: sampleDate2,
  },
  {
    category: {
      id: 0,
    },
    date: sampleDate3,
  },
  {
    category: {
      id: 6,
    },
    date: sampleDate3,
  },
];

const mockOnClickDate = jest.fn();

describe('<Calendar />', () => {
  it('should render Calendar', () => {
    const component = mount(<Calendar events={sample} onClickDay={mockOnClickDate} currentDate={new Date()} />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);

    const dayComponent = component.find('.abled');
    expect(dayComponent.length).toBe(31);
    dayComponent.at(0).simulate('click');
    dayComponent.at(0).simulate('keypress');

    const component2 = mount(<Calendar onClickDate={mockOnClickDate} currentDate={new Date()} />);
    const wrapper2 = component2.find('.Calendar');
    expect(wrapper2.length).toBe(1);
  });
});
