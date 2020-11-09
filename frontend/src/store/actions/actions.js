import axios from 'axios';
import * as actionTypes from './actionTypes';

export const signIn_ = (user) => ({ type: actionTypes.SIGN_IN, user });

export const signIn = (args) => (dispatch) => axios.post('api/signin/', {
  params: {
    username: args.username,
    password: args.password,
  },
})
  .then((res) => {
    dispatch(signIn_(res.data));
  });

export const signUp = (args) => axios.post('api/signup/', {
  params: {
    username: args.username,
    password: args.password,
    university: args.university,
    department: args.department,
    email: args.email,
    first_name: args.firstName,
    last_name: args.lastName,
  },
});
