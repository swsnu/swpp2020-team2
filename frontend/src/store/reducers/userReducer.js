import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signinedUser: null,
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, signinedUser: action.user.id, userInfo: action.user };
    case actionTypes.SIGN_UP:
      return state;
    case actionTypes.ACTIVATE:
      return state;
    case actionTypes.GET_USER:
      return { ...state, signinedUser: action.user.id, userInfo: action.user };
    default:
      break;
  }
  return state;
};

export default userReducer;
