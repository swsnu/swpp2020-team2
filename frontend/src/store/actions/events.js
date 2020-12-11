import axios from 'axios';

import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const sampleDate = new Date();
const sampleDate2 = addDays(sampleDate, 15);
const sampleDate3 = addMonths(sampleDate, 1);
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

export const getAllEvent_ = (events) => {
  return {
    type: actionTypes.GET_ALL_EVENT,
    events: events,
  };
}

export const getAllEvent = () => {
  return dispatch => {
    return axios.get('/api/event/')
      .then(res => dispatch(getAllEvent_(res.data)))
  };
};

export const getEvent_ = (event) => {
  return {
    type: actionTypes.GET_EVENT,
    target: event,
  }
};

export const getEvent = (id) => {
  return dispatch => {
    return axios.get(`/api/event/${id}/full/`)
      .then((res) => dispatch(getEvent_(res.data)));
  }
}


export const createEvent_ = (event) => ({ type: actionTypes.CREATE_EVENT, target: event });

export const createEvent = (args) => (dispatch) => axios.post('/api/event/create/', {
  title: args.title,
  place: args.place,
  date: args.date,
  category: args.category,
  tag: args.tag,
  group: args.group,
  begin_time: args.begin_time,
  end_time: args.end_time,
  last_editor: args.last_editor,
  image: args.image,
  content: args.content,
})
  .then((res) => {
    dispatch(createEvent_(res.data));
  });




export const reportEvent = (id, content) => (dispatch) => axios.post('/api/event_report/', { event: id, content })
  .then((res) => {
    if (res.status === 201) alert('신고가 접수되었습니다.');
    else alert('예상치 못한 오류로 신고접수가 실패하였습니다. 잠시 뒤에 재시도해주세요');
  });
