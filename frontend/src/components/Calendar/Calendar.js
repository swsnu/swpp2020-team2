import React, { useState } from 'react';
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import { categoryIcons } from '../../images/index';
import './Calendar.css';

const Calendar = ({
  events, onClickDay,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const header = () => {
    const dateFormat = 'yyyy. MM.';
    return (
      <div className="header">
        <div className="arrow" onClick={() => prevMonth()} onKeyPress={() => prevMonth()} role="button" tabIndex="-1">
          {'<'}
        </div>
        <div className="year_month">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="arrow" onClick={() => nextMonth()} onKeyPress={() => nextMonth()} role="button" tabIndex="-1">
          {'>'}
        </div>
      </div>
    );
  };
  const weekDays = () => {
    const weekName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekList = [];
    for (let j = 0; j < 7; j += 1) {
      weekList.push(<div key={weekName[j]} className="column cell"><span key={weekName[j]} className="number">{weekName[j]}</span></div>);
    }
    return <div className="row" key="week">{weekList}</div>;
  };
  const cells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dateFormat = 'd';
    const rows = [];
    const categoryName = ['공', '전', '일', '충', '장', '세', '대', '해'];
    let daylist = [];
    let day = startDate;
    let formattedDate = '';
    const classNameConstructor = (_day, _monthStart) => {
      if (!isSameMonth(_day, _monthStart)) return 'column cell disabled';
      return 'column cell abled';
    };

    rows.push(weekDays());

    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        const day_ = day;
        const containCategory = [0, 0, 0, 0, 0, 0, 0, 0];
        const eventInDay = (typeof events === 'undefined') ? [] : events.filter((evt) => isSameDay(evt.date, day_));
        eventInDay.forEach((evt) => { containCategory[evt.category.id] = 1; });
        const icons = [];
        for (let j = 0; j < 8; j += 1) {
          if (containCategory[j] === 1) icons.push(<img className="img" key={j} src={categoryIcons[j]} alt={categoryName[j]} />);
        }
        formattedDate = format(day_, dateFormat);
        daylist.push(
          <div
            className={classNameConstructor(day_, monthStart)}
            key={day_}
            onClick={() => onClickDay(day_, eventInDay)}
            onKeyPress={() => onClickDay(day_, eventInDay)}
            role="button"
            tabIndex="-1"
          >
            <span className="number">{formattedDate}</span>
            <div className="icons">{icons}</div>
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {daylist}
        </div>,
      );
      daylist = [];
    }
    return <div className="body">{rows}</div>;
  };

  return (
    <div className="View">
      <div className="Calendar">
        <div>{header()}</div>
        <div>{cells()}</div>
      </div>
    </div>
  );
};

export default Calendar;
