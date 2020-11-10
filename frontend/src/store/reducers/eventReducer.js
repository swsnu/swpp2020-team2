import * as actionTypes from '../actions/actionTypes';

const initialState = {
  events: [],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EVENT:
      return { ...state, events: action.events };
    default:
      break;
  }
  return state;
};

export default eventReducer;
