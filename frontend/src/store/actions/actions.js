import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const signIn_ = (user) => ({ type: actionTypes.SIGN_IN, user });

export const signIn = (args) => (dispatch) => axios.post('api/signin/', {
  username: args.username,
  password: args.password,
})
  .then((res) => {
    dispatch(signIn_(res.data));
  });

export const signUp_ = () => ({ type: actionTypes.SIGN_UP });

export const signUp = (args) => (dispatch) => axios.post('api/signup/', {
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

export const activate = (args) => (dispatch) => axios.get(`api/signup/activate/${args.uidb64}/${args.token}/`)
  .then((res) => {
    dispatch(activate_());
  });
