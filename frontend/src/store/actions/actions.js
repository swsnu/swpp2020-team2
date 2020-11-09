import axios from 'axios';
import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import * as actionTypes from './actionTypes';

const sampleDate = new Date();
const sampleDate2 = addDays(sampleDate, 25);
const sampleDate3 = addMonths(sampleDate, 1);
const sample = [
  {
    title: 'HIS 공연',
    place: '학생회관',
    group: {
      name: 'HIS',
    },
    category: {
      id: 0,
    },
    date: sampleDate,
  },
  {
    title: '제 27회 졸업전시회',
    place: '미대 건물 1층',
    group: {
      name: '미대 학생회',
    },
    category: {
      id: 1,
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
