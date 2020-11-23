import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signinedUser: null,
  userInfo: null,
  userFullInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, signinedUser: action.user.id, userInfo: action.user };
    case actionTypes.SIGN_OUT:
      return {
        ...state, signinedUser: null, userInfo: null, userFullInfo: null,
      };
    case actionTypes.SIGN_UP:
      return state;
    case actionTypes.ACTIVATE:
      return state;
    case actionTypes.GET_USER:
      return { ...state, signinedUser: action.user.id, userInfo: action.user };
    case actionTypes.GET_USER_FULL:
      return { ...state, signinedUser: action.user.id, userFullInfo: action.user };
    default:
      break;
  }
  return state;
};

export default userReducer;
