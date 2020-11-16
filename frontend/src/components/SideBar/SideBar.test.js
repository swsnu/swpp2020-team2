import React from 'react';
import { mount } from 'enzyme';
import SideBar from './SideBar';

const mockSetViewOption = jest.fn();
const mockSetIncluding = jest.fn();
const mockSetTagOption = jest.fn();
const mockSetCategoryOption = jest.fn();
const mockSetGroupOption = jest.fn();
const mockSetEventOption = jest.fn();
const mockSetSortOption = jest.fn();

describe('<SideBar />', () => {
  let sidebar;
  beforeEach(() => {
    sidebar = (
      <SideBar
        setViewOption={mockSetViewOption}
        setIncluding={mockSetIncluding}
        setTagOption={mockSetTagOption}
        setCategoryOption={mockSetCategoryOption}
        setGroupOption={mockSetGroupOption}
        setEventOption={mockSetEventOption}
        setSortOption={mockSetSortOption}
      />
    );
  });

  it('should render SideBar', () => {
    const div1 = document.createElement('div');
    div1.setAttribute('id', 'including');
    document.body.appendChild(div1);

    const component = mount(sidebar, { attachTo: document.getElementById('including') });
    const wrapper = component.find('.SideBar');
    expect(wrapper.length).toBe(1);

    const viewOptionButton = component.find('.ViewOptionButton');
    expect(viewOptionButton.length).toBe(2);
    viewOptionButton.at(0).simulate('click');
    viewOptionButton.at(1).simulate('click');

    const includingSubmit = component.find('.IncludingSubmit');
    expect(includingSubmit.length).toBe(1);
    includingSubmit.simulate('click');

    const tagSubmit = component.find('.TagSubmit');
    expect(tagSubmit.length).toBe(1);
    tagSubmit.simulate('click');

    const groupOptionButton = component.find('.GroupOptionButton');
    expect(groupOptionButton.length).toBe(3);
    groupOptionButton.at(0).simulate('click');
    groupOptionButton.at(1).simulate('click');
    groupOptionButton.at(2).simulate('click');

    const eventOptionButton = component.find('.EventOptionButton');
    expect(eventOptionButton.length).toBe(1);
    eventOptionButton.simulate('click');

    const categoryOptionButton = component.find('.CategoryOptionButton');
    expect(categoryOptionButton.length).toBe(8);
    categoryOptionButton.at(0).simulate('click');

    const sortOptionSelect = component.find('.SortOptionSelect');
    expect(sortOptionSelect.length).toBe(1);
    sortOptionSelect.simulate('change', {
      target: {
        value: 'recent',
      },
    });
  });
});
