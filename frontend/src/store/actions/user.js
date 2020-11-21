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
    alert('verification link is sent to your mail!');
  });

export const activate_ = () => ({ type: actionTypes.ACTIVATE });

export const activate = (args) => (dispatch) => axios.get(`/api/signup/activate/${args.uidb64}/${args.token}/`)
  .then((res) => {
    dispatch(activate_());
  });

export const getUser_ = (user) => ({type: actionTypes.GET_USER, user });

export const getUser = () => (dispatch) => axios.get('/api/user/signin/')
  .then((res)=>{
    dispatch(getUser_(res.data));
  });

export const getUserFull_ = (user)=>(dispatch)=>({type:actionTypes.GET_USER_FULL,user});

export const getUserFull=()=>(dispatch)=>axios.get('/api/user/signin/full/')
  .then((res)=>{
    dispatch(getUserFull_(res.data));
  });