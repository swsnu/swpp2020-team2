import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signinedUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, signinedUser: action.user };
    case actionTypes.SIGN_UP:
      return state;
    case actionTypes.ACTIVATE:
      return state;
    default:
      break;
  }
  return state;
};

export default userReducer;
