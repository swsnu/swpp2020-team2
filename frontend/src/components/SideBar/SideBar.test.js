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
  beforeEach(() => {
  });

  it('should render SideBar', () => {
    const sidebar = (
      <SideBar
        setViewOption={mockSetViewOption}
        setIncluding={mockSetIncluding}
        setTagOption={mockSetTagOption}
        setCategoryOption={mockSetCategoryOption}
        setGroupOption={mockSetGroupOption}
        setEventOption={mockSetEventOption}
        setSortOption={mockSetSortOption}
        selectedState={{
          viewOption: 'Calendar',
          including: '',
          tagOption: '',
          categoryOption: new Set(),
          groupOption: '',
          eventOption: null,
          sortOption: 'recent',
        }}
      />
    );

    const div1 = document.createElement('div');
    div1.setAttribute('id', 'including');
    document.body.appendChild(div1);

    const component = mount(sidebar, { attachTo: document.getElementById('including') });
    const wrapper = component.find('.SideBar');
    expect(wrapper.length).toBe(1);

    const viewOptionButton0 = component.find('.ViewOptionButton0');
    expect(viewOptionButton0.length).toBe(1);
    viewOptionButton0.at(0).simulate('click');

    const viewOptionButton1 = component.find('.ViewOptionButton1');
    expect(viewOptionButton1.length).toBe(1);
    viewOptionButton1.at(0).simulate('click');

    const includingSubmit = component.find('.IncludingSubmit');
    expect(includingSubmit.length).toBe(1);
    includingSubmit.simulate('click');

    const tagSubmit = component.find('.TagSubmit');
    expect(tagSubmit.length).toBe(1);
    tagSubmit.simulate('click');

    const groupOptionButton = component.find('.GroupOptionButton0');
    expect(groupOptionButton.length).toBe(3);
    groupOptionButton.at(0).simulate('click');
    groupOptionButton.at(1).simulate('click');
    groupOptionButton.at(2).simulate('click');

    const eventOptionButton = component.find('.EventOptionButton0');
    expect(eventOptionButton.length).toBe(1);
    eventOptionButton.simulate('click');

    const categoryOptionButton = component.find('.CategoryOptionButton01');
    expect(categoryOptionButton.length).toBe(1);
    categoryOptionButton.at(0).simulate('click');

    const sortOptionSelect = component.find('.SortOptionSelect');
    expect(sortOptionSelect.length).toBe(1);
    sortOptionSelect.simulate('change', {
      target: {
        value: 'recent',
      },
    });
  });

  it('should render another SideBar', () => {
    const _set = new Set();
    for (let i = 0; i < 8; i += 1) {
      _set.add(i);
    }
    const sidebar = (
      <SideBar
        setViewOption={mockSetViewOption}
        setIncluding={mockSetIncluding}
        setTagOption={mockSetTagOption}
        setCategoryOption={mockSetCategoryOption}
        setGroupOption={mockSetGroupOption}
        setEventOption={mockSetEventOption}
        setSortOption={mockSetSortOption}
        selectedState={{
          viewOption: 'List',
          including: '',
          tagOption: '',
          categoryOption: _set,
          groupOption: 'like',
          eventOption: 'like',
          sortOption: 'recent',
        }}
      />
    );

    const component = mount(sidebar);
    const wrapper = component.find('.SideBar');
    expect(wrapper.length).toBe(1);

    const viewOptionButton0 = component.find('.ViewOptionButton0');
    expect(viewOptionButton0.length).toBe(1);
    viewOptionButton0.at(0).simulate('click');

    const viewOptionButton1 = component.find('.ViewOptionButton1');
    expect(viewOptionButton1.length).toBe(1);
    viewOptionButton1.at(0).simulate('click');

    const groupOptionButton = component.find('.GroupOptionButton1');
    expect(groupOptionButton.length).toBe(1);
    groupOptionButton.at(0).simulate('click');

    const eventOptionButton = component.find('.EventOptionButton1');
    expect(eventOptionButton.length).toBe(1);
    eventOptionButton.simulate('click');

    const categoryOptionButton = component.find('.CategoryOptionButton11');
    expect(categoryOptionButton.length).toBe(1);
    categoryOptionButton.at(0).simulate('click');
  });

  it('should render other SideBars', () => {
    const sidebar = (
      <SideBar
        setViewOption={mockSetViewOption}
        setIncluding={mockSetIncluding}
        setTagOption={mockSetTagOption}
        setCategoryOption={mockSetCategoryOption}
        setGroupOption={mockSetGroupOption}
        setEventOption={mockSetEventOption}
        setSortOption={mockSetSortOption}
        selectedState={{
          viewOption: 'Calendar',
          including: '',
          tagOption: '',
          categoryOption: new Set(),
          groupOption: 'my',
          eventOption: '',
          sortOption: 'recent',
        }}
      />
    );

    const component = mount(sidebar);
    const wrapper = component.find('.SideBar');
    expect(wrapper.length).toBe(1);

    const sidebar2 = (
      <SideBar
        setViewOption={mockSetViewOption}
        setIncluding={mockSetIncluding}
        setTagOption={mockSetTagOption}
        setCategoryOption={mockSetCategoryOption}
        setGroupOption={mockSetGroupOption}
        setEventOption={mockSetEventOption}
        setSortOption={mockSetSortOption}
        selectedState={{
          viewOption: 'Calendar',
          including: '',
          tagOption: '',
          categoryOption: new Set(),
          groupOption: 'notification',
          eventOption: '',
          sortOption: 'recent',
        }}
      />
    );

    const component2 = mount(sidebar2);
    const wrapper2 = component2.find('.SideBar');
    expect(wrapper2.length).toBe(1);
  });
});
