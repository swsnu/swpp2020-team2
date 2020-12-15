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
    localStorage.setItem('isLogin', 'true');
  })
  .catch((err) => {
    if (err.response.status === 401)alert('ID or password is wrong');
  });

export const signOut_ = () => ({ type: actionTypes.SIGN_OUT });

export const signOut = () => (dispatch) => axios.get('/api/signout/')
  .then((res) => {
    dispatch(signOut_());
    localStorage.removeItem('isLogin');
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
    if (res.data === 'Username Taken')alert('Username is already taken!');
    else if (res.data === 'Already Activated')alert('This account is already activated!');
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

// like / bring events for loggedUser

export const likeEvent_ = (id, oper) => ({
  type: actionTypes.LIKE_EVENT,
  event_id: id,
  oper,
});
export const likeEvent = (id, oper) => (dispatch) => axios.put('/api/user/signin/like_event/', { event: id, operation: oper })
  .then((res) => {
    if (res.status !== 204) alert('알 수 없는 문제가 발생하였습니다 !');
    else {
      dispatch(likeEvent_(id, oper));
    }
  });

export const bringEvent_ = (id, oper) => ({
  type: actionTypes.BRING_EVENT,
  event_id: id,
  oper,
});
export const bringEvent = (id, oper) => (dispatch) => axios.put('/api/user/signin/bring_event/', { event: id, operation: oper })
  .then((res) => {
    if (res.status !== 204) alert('알 수 없는 문제가 발생하였습니다 !');
    else {
      dispatch(bringEvent_(id, oper));
    }
  });

export const changePassword = (oldPassword, password) => (dispatch) => axios.put('/api/user/signin/change_password/', { old_password: oldPassword, password })
  .then((res) => {
    if (res.status === 403)alert('current password is wrong!');
    else alert('setting has been applied!');
  });

export const changeLanguage = (language) => (dispatch) => axios.put('/api/user/signin/change_language/', { language });

export const changeUserInfo = (firstName, lastName, department) => (dispatch) => axios.put('/api/user/signin/change_info/', {
  first_name: firstName,
  last_name: lastName,
  department,
});
