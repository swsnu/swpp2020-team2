import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const getUniversities_ = (data) => ({ type: actionTypes.GET_UNIVERSITIES, data });

export const getUniversities = () => (dispatch) => axios.get('/api/university/')
  .then((res) => {
    dispatch(getUniversities_(res.data));
  });

export const getDepartments_ = (data) => ({ type: actionTypes.GET_DEPARTMENTS, data });

export const getDepartments = () => (dispatch) => axios.get('/api/department/')
  .then((res) => {
    dispatch(getDepartments_(res.data));
  });

export const getCategories_ = (data) => ({ type: actionTypes.GET_CATEGORIES, data });

export const getCategories = () => (dispatch) => axios.get('/api/category/')
  .then((res) => {
    dispatch(getCategories_(res.data));
  });

export const getLanguages_ = (data) => ({ type: actionTypes.GET_LANGUAGES, data });

export const getLanguages = () => (dispatch) => axios.get('/api/language/')
  .then((res) => {
    dispatch(getLanguages_(res.data));
  });