import axios from 'axios';

import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const sampleDate = format(new Date(), 'yyyy-MM-dd');
const sampleDate2 = format(addDays(new Date(), 15), 'yyyy-MM-dd');
const sampleDate3 = format(addDays(new Date(), 11), 'yyyy-MM-dd');
const sample = [
  {
    id: 1,
    title: 'HIS 공연',
    group: 'HIS',
    place: '학생회관',
    begin_time: '09:00',
    end_time: '14:00',
    category: {
      id: 0,
      name: '공연',
    },
    date: sampleDate,
  },
  {
    id: 2,
    title: '제 27회 졸업전시회',
    group: '미대 학생회',
    place: '미대 건물 1층',
    begin_time: '09:00',
    end_time: '15:00',
    category: {
      id: 1,
      name: '전시회',
    },
    date: sampleDate,
  },
  {
    id: 3,
    title: '제 27회 졸업전시회',
    group: '미대 학생회',
    place: '미대 건물 1층',
    begin_time: '09:00',
    end_time: '15:00',
    category: {
      id: 0,
      name: '공연',
    },
    date: sampleDate2,
  },
  {
    id: 4,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 1,
      name: '전시회',
    },
    date: sampleDate2,
  },
  {
    id: 5,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 2,
      name: '일일호프',
    },
    date: sampleDate2,
  },
  {
    id: 6,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 3,
      name: '축제',
    },
    date: sampleDate2,
  },
  {
    id: 7,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 4,
      name: '장터',
    },
    date: sampleDate2,
  },
  {
    id: 8,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 5,
      name: '세미나',
    },
    date: sampleDate2,
  },
  {
    id: 9,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 6,
      name: '대회',
    },
    date: sampleDate2,
  },
  {
    id: 10,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 7,
      name: '해당없음',
    },
    date: sampleDate2,
  },
  {
    id: 11,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 3,
      name: '축제',
    },
    date: sampleDate3,
  },
  {
    id: 12,
    title: 'title',
    group: 'group',
    place: 'place',
    begin_time: 'begin_time',
    end_time: 'end_time',
    category: {
      id: 6,
      name: '대회',
    },
    date: sampleDate3,
  },
];

export const getAllEvent_ = (events) => ({
  type: actionTypes.GET_ALL_EVENT,
  events,
});

export const getAllEvent = () => (dispatch) => axios.get('/api/event/')
  .then((res) => dispatch(getAllEvent_(res.data)));

export const getEvent_ = (event) => ({
  type: actionTypes.GET_EVENT,
  target: event,
});

export const getEvent = (id) => (dispatch) => axios.get(`/api/event/${id}/full/`)
  .then((res) => dispatch(getEvent_(res.data)));

export const uploadImage_ = (data) => ({ type: actionTypes.POST_IMAGE, data });

export const uploadImage = (dictImg) => (dispatch) => axios.post('/api/image/', dictImg)
  .then((res) => {
    dispatch(uploadImage_(res.data));
  });

export const createEvent_ = (event) => ({ type: actionTypes.CREATE_EVENT, target: event });

export const createEvent = (event) => (dispatch) => axios.post('/api/event/create/', {
  title: event.title,
  place: event.place,
  date: event.date,
  category: event.category,
  tag: event.tag,
  group: event.group,
  begin_time: event.begin_time,
  end_time: event.end_time,
  last_editor: event.last_editor,
  image: event.image,
  content: event.content,
})
  .then((res) => {
    if (res.status === 201) {
      dispatch(createEvent_(res.data));
      alert('이벤트를 성공적으로 등록하였습니다.');
    } else {
      alert('예상치 못한 오류로 이벤트 등록이 실패하였습니다.');
    }
  });

export const modifyEvent_ = (event) => ({ type: actionTypes.MODIFY_EVENT, target: event });

export const modifyEvent = (event) => (dispatch) => axios.put(`/api/event/${event.id}/full/`, {
  title: event.title,
  place: event.place,
  date: event.date,
  category: event.category,
  tag: event.tag,
  group: event.group,
  begin_time: event.begin_time,
  end_time: event.end_time,
  last_editor: event.last_editor,
  content: event.content,
})
  .then((res) => {
    if (res.status === 201) {
      dispatch(modifyEvent_(res.data));
      alert('이벤트를 성공적으로 수정하였습니다.');
    } else {
      alert('예상치 못한 오류로 이벤트 등록이 실패하였습니다.');
    }
  });

export const deleteEvent_ = (id) => ({ type: actionTypes.DELETE_EVENT, target: id });
export const deleteEvent = (id) => (dispatch) => axios.delete(`/api/event/${id}/full/`)
  .then((res) => {
    if (res.status === 200) {
      dispatch(deleteEvent_(id));
      alert('이벤트를 성공적으로 삭제하였습니다.');
    } else {
      alert('예상치 못한 오류로 이벤트 삭제가 실패하였습니다.');
    }
  });

export const getTagRecommend_ = (tagList) => ({ type: actionTypes.GET_TAG_RECOMMEND, target: tagList });

export const getTagRecommend = (content) => (dispatch) => axios.post('/api/tag/recommend/', { 'content': content, 'num': 5 })
  .then((res) => {
    dispatch(getTagRecommend_(res.data));
  });

export const reportEvent = (id, content) => (dispatch) => axios.post('/api/event_report/', { event: id, content })
  .then((res) => {
    if (res.status === 201) alert('신고가 접수되었습니다.');
    else alert('예상치 못한 오류로 신고접수가 실패하였습니다. 잠시 뒤에 재시도해주세요');
  });
