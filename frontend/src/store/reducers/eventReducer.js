import * as actionTypes from '../actions/actionTypes';

const initialState = {
  events: [],
  target: {},

};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EVENT:
      return { ...state, events: action.events };
    case actionTypes.GET_EVENT:
      return { ...state, target: action.target };

    default:
      break;
  }
  return state;
};

export default eventReducer;
