import React from 'react';
import './SideBar.css';
import { categoryIcons } from '../../images/index';

const SideBar = ({
  setViewOption,
  setIncluding,
  setTagOption,
  setCategoryOption,
  setGroupOption,
  setEventOption,
  setSortOption,
  selectedState,
}) => {
  const ViewOption = () => (
    <div className="ViewOption">
      <div className="OptionName">View</div>
      {(selectedState.viewOption === 'Calendar') ? (
        <div className="ViewOptionButtons">
          <div className="ViewOptionButton0" onClick={() => setViewOption('Calendar')}>Calendar</div>
          <div className="ViewOptionButton1" onClick={() => setViewOption('List')}>List</div>
        </div>
      ) : (
        <div className="ViewOptionButtons">
          <div className="ViewOptionButton1" onClick={() => setViewOption('Calendar')}>Calendar</div>
          <div className="ViewOptionButton0" onClick={() => setViewOption('List')}>List</div>
        </div>
      )}
    </div>
  );

  function includingSubmit() {
    setIncluding(document.getElementById('including').value);
  }

  function tagSubmit() {
    setTagOption(document.getElementById('tagOption').value);
  }

  const categoryName = ['', '#공연', '#전시회', '#일일호프', '#축제', '#장터', '#세미나', '#대회', '#해당없음'];
  const FilterOption = () => {
    const categoryOptions = [];
    const selectedCategory = [];
    selectedCategory.push(0);
    for (let i = 1; i <= 8; i += 1) {
      if (selectedState.categoryOption.has(i)) selectedCategory.push(1);
      else selectedCategory.push(0);
    }
    for (let i = 1; i <= 8; i += 1) {
      categoryOptions.push(
        <div key={i} className={`CategoryOptionButton${selectedCategory[i]}${i}`} src={categoryIcons[i]} label="categoryOption" type="button" onClick={() => setCategoryOption(i)}>
          {categoryName[i]}
        </div>,
      );
    }

    const selectedGroupOption = [];
    if (selectedState.groupOption === 'like') selectedGroupOption.push(1);
    else selectedGroupOption.push(0);
    if (selectedState.groupOption === 'my') selectedGroupOption.push(1);
    else selectedGroupOption.push(0);
    if (selectedState.groupOption === 'notification') selectedGroupOption.push(1);
    else selectedGroupOption.push(0);

    const selectedEventOption = [];
    if (selectedState.eventOption === 'like') selectedEventOption.push(1);
    else selectedEventOption.push(0);

    return (
      <div className="FilterOption">
        <div className="OptionName">Filter</div>
        <div>Including</div>
        <div className="Including">
          <input className="IncludingText" type="text" id="including" />
          <input className="IncludingSubmit" type="submit" onClick={() => includingSubmit()} value=">" />
        </div>
        <div>Tag</div>
        <div className="TagOption">
          <input className="TagText" type="text" id="tagOption" />
          <input className="TagSubmit" type="submit" onClick={() => tagSubmit()} value=">" />
        </div>
        <div>Category</div>
        <div className="CategoryOption">
          {categoryOptions}
        </div>
        <div>Group</div>
        <div className="GroupOption">
          <div className={`GroupOptionButton${selectedGroupOption[0]}`} label="groupOption" type="button" onClick={() => setGroupOption('like')}>like</div>
          <div className={`GroupOptionButton${selectedGroupOption[1]}`} label="groupOption" type="button" onClick={() => setGroupOption('my')}>my</div>
          <div className={`GroupOptionButton${selectedGroupOption[2]}`} label="groupOption" type="button" onClick={() => setGroupOption('notification')}>notification</div>
        </div>
        <div>Event</div>
        <div className="EventOption">
          <div className={`EventOptionButton${selectedEventOption[0]}`} label="eventOption" type="button" onClick={() => setEventOption('like')}>like</div>
        </div>
      </div>
    );
  };

  const SortOptions = () => (
    <div className="SortOption">
      <div className="OptionName">Sort</div>
      <select className="SortOptionSelect" onChange={(e) => setSortOption(e.target.value)}>
        <option value="date">날짜순</option>
        <option value="likes">좋아요순</option>
        <option value="brings">가져오기순</option>
      </select>
    </div>
  );
  return (
    <div className="SideBar">
      <div className="ViewDiv">{ViewOption()}</div>
      <div className="FilterDiv">{FilterOption()}</div>
      <div className="SortDiv">{SortOptions()}</div>
    </div>
  );
};

export default SideBar;
