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
}) => {
  const ViewOption = () => (
    <div className="ViewOption">
      <div className="OptionName">View</div>
      <div className="ViewOptionButtons">
        <div className="ViewOptionButton" onClick={() => setViewOption('Calendar')}>Calendar</div>
        <div className="ViewOptionButton" onClick={() => setViewOption('List')}>List</div>
      </div>
    </div>
  );

  function includingSubmit() {
    setIncluding(document.getElementById('including').value);
  }

  function tagSubmit() {
    setTagOption(document.getElementById('tagOption').value);
  }

  const categoryName = ['#공연', '#전시회', '#일일호프', '#축제', '#장터', '#세미나', '#대회', '#해당없음'];
  const FilterOption = () => {
    const categoryOptions = [];
    for (let i = 0; i < 8; i += 1) {
      categoryOptions.push(
        <div key={i} className="CategoryOptionButton" src={categoryIcons[i]} label="categoryOption" type="button" onClick={() => setCategoryOption(i)}>
          {categoryName[i]}
        </div>,
      );
    }

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
          <div className="GroupOptionButton" label="groupOption" type="button" onClick={() => setGroupOption('like')}>like</div>
          <div className="GroupOptionButton" label="groupOption" type="button" onClick={() => setGroupOption('my')}>my</div>
          <div className="GroupOptionButton" label="groupOption" type="button" onClick={() => setGroupOption('notification')}>notification</div>
        </div>
        <div>Event</div>
        <div className="EventOption">
          <div className="EventOptionButton" label="eventOption" type="button" onClick={() => setEventOption('like')}>like</div>
        </div>
      </div>
    );
  };

  const SortOptions = () => (
    <div className="SortOption">
      <div className="OptionName">Sort</div>
      <select className="SortOptionSelect" onChange={(e) => setSortOption(e.value)}>
        <option value="recent">최근순</option>
        <option value="like">좋아요순</option>
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
