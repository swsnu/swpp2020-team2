import React from 'react';
import { mount } from 'enzyme';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import ListView from './ListView';

const sampleDate = new Date();
const sampleDate2 = addDays(sampleDate, 25);
const sampleDate3 = addMonths(sampleDate, 1);
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

const mockOnClickCreateEvent = jest.fn();

describe('<ListView />', () => {
  it('should render Listview', () => {
    const history = [];
    const component = mount(<ListView history={history} day={new Date()} monthEventList={sample} onClickCreateEvent={mockOnClickCreateEvent} />);
    const wrapper = component.find('.ListView');
    expect(wrapper.length).toBe(1);

    const button = component.find('.createEventButton');
    expect(button.length).toBe(1);
    button.simulate('click');

    const detail = component.find('.title');
    expect(detail.length).toBe(12);
    detail.at(0).simulate('click');
  });
});
