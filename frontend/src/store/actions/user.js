import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const signIn_ = (user) => ({ type: actionTypes.SIGN_IN, user });

export const signIn = (args) => (dispatch) => axios.post('/api/signin/', {
  username: args.username,
  password: args.password,
})
  .then((res) => {
    dispatch(signIn_(res.data));
  })
  .catch((err) => {
    if (err.response.status === 401)alert('ID or password is wrong');
  });

export const signOut_ = () => ({ type: actionTypes.SIGN_OUT });

export const signOut = () => (dispatch) => axios.get('/api/signout/')
  .then((res) => {
    dispatch(signOut_());
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
    if (res.content === 'Username Taken')alert('Username is already taken!');
    else if (res.content === 'Already Activated')alert('This account is already activated!');
    else {
      dispatch(signUp_());
      alert('verification link is sent to your mail!');
    }
  });

export const activate_ = () => ({ type: actionTypes.ACTIVATE });

export const activate = (args) => (dispatch) => axios.get(`/api/signup/activate/${args.uidb64}/${args.token}/`)
  .then((res) => {
    dispatch(activate_());
  });

export const getUser_ = (user) => ({ type: actionTypes.GET_USER, user });

export const getUser = () => (dispatch) => axios.get('/api/user/signin/')
  .then((res) => {
    dispatch(getUser_(res.data));
  });

export const getUserFull_ = (user) => ({ type: actionTypes.GET_USER_FULL, user });

export const getUserFull = () => (dispatch) => axios.get('/api/user/signin/full/')
  .then((res) => {
    dispatch(getUserFull_(res.data));
  });

export const likeGroup = (id, op) => (dispatch) => axios.put('/api/user/signin/like_group/', {
  group: id,
  operation: op,
});

export const noticeGroup = (id, op) => (dispatch) => axios.put('/api/user/signin/get_notification/', {
  group: id,
  operation: op,
});

export const joinGroup = (id, op) => (dispatch) => axios.put('/api/user/signin/join_request/', {
  group: id,
  operation: op,
});
