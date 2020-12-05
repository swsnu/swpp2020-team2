import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchGroups: [],
  currGroup: null,
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GROUP:
      return { ...state, currGroup: action.data };
    case actionTypes.GET_ALL_GROUP:
      return { ...state, searchGroups: action.data };
    case actionTypes.GET_GROUP:
      return { ...state, currGroup: action.data };
    case actionTypes.SEARCH_GROUP:
      return { ...state, searchGroups: action.data };
    default:
      break;
  }
  return state;
};

export default groupReducer;
