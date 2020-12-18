import React, { Component } from 'react';
import format from 'date-fns/format';
import './ListView.css';

const ListView = ({
  monthEventList, onClickDetailEvent,
}) => {
  const header = (
    <div className="board_header">
      <div className="board_id">번호</div>
      <div className="board_category">분류</div>
      <div className="board_title">제목</div>
      <div className="board_group">단체</div>
      <div className="board_date">날짜</div>
      <div className="board_like">좋아요</div>
      <div className="board_bring">가져오기</div>
    </div>
  );
  const categoryName = ['', '공연', '전시회', '일일호프', '축제', '장터', '세미나', '대회', ''];
  const contents = [];
  for (let i = 0; i < monthEventList.length; i += 1) {
    const event = monthEventList[i];
    contents.push(
      <div key={i} className={`board_content${i % 2}`} onClick={() => onClickDetailEvent(event.id)}>
        <div className="board_id">{event.id}</div>
        <div className="board_category">{categoryName[event.category.id]}</div>
        <div className="board_title">{event.title}</div>
        <div className="board_group">{event.group.name}</div>
        <div className="board_date">{event.date}</div>
        <div className="board_like">{event.likes.length}</div>
        <div className="board_bring">{event.brings.length}</div>
      </div>,
    );
  }

  return (
    <div className="ListView">
      <div className="board">
        {header}
        <nav className="nav">
          {contents}
        </nav>
      </div>
    </div>
  );
};

export default ListView;
