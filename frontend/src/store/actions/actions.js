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
    },
    date: sampleDate3,
  },
];

export const getAllEvent_ = (events_) => ({
  type: actionTypes.GET_ALL_EVENT,
  events: events_,
});

export const getAllEvent = () => {
  const res = axios.get('/api/event');
  return {
    type: actionTypes.GET_ALL_EVENT,
    events: sample,
  };
};

export const signIn_ = (user) => ({ type: actionTypes.SIGN_IN, user });

export const signIn = (args) => (dispatch) => axios.post('/api/signin/', {
  username: args.username,
  password: args.password,
})
  .then((res) => {
    dispatch(signIn_(res.data));
  });

export const signUp_ = () => ({ type: actionTypes.SIGN_UP });

export const signUp = (args) => (dispatch) => axios.post('/api/signup/', {
  username: args.username,
  password: args.password,
  university: args.university,
  department: args.department,
  email: args.email,
  first_name: args.firstName,
  last_name: args.lastName,
})
  .then((res) => {
    dispatch(signUp_());
  });

export const activate_ = () => ({ type: actionTypes.ACTIVATE });

export const activate = (args) => (dispatch) => axios.get(`/api/signup/activate/${args.uidb64}/${args.token}/`)
  .then((res) => {
    dispatch(activate_());
  });
