import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const createGroup_ = (data) => ({ type: actionTypes.CREATE_GROUP, data });

export const createGroup = (args) => (dispatch) => axios.post('/group/create/', {
  name: args.name,
  king: args.user,
  description: args.description,
})
  .then((res) => {
    dispatch(createGroup_(res.data));
  });

export const getAllGroup_ = (data) => ({ type: actionTypes.GET_ALL_GROUP, data });

export const getAllGroup = () => (dispatch) => axios.get('/group/simple/')
  .then((res) => {
    dispatch(getAllGroup_(res.data));
  });

export const getGroup_ = (data) => ({ type: actionTypes.GET_GROUP, data });

export const getGroup = (id) => (dispatch) => axios.get(`/group/${id}/`)
  .then((res) => {
    dispatch(getGroup_(res.data));
  });
