import * as actionTypes from '../actions/actionTypes';

const initialState = {
  universities: [],
  departments: [],
  categories: [],
};

const otherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_UNIVERSITIES:
      return { ...state, universities: action.data };
    case actionTypes.GET_DEPARTMENTS:
      return { ...state, departments: action.data };
    case actionTypes.GET_CATEGORIES:
      return { ...state, categories: action.data };
    default:
      break;
  }
  return state;
};

export default otherReducer;
