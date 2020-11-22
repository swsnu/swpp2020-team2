import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const createGroup_ = () => ({ type: actionTypes.CREATE_GROUP });

export const createGroup = (args) => (dispatch) => axios.post('/group/create/', {
  name: args.name,
  king: args.user,
  description: args.description,
})
  .then((res) => {
    dispatch(createGroup_());
  });
