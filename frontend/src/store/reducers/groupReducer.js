import * as actionTypes from '../actions/actionTypes';

const initialState = {

};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GROUP:
      return state;
    default:
      break;
  }
  return state;
};

export default groupReducer;
