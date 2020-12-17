import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchGroups: [],
  currGroup: null,
  likeGroups: [],
  noticeGroups: [],
  myGroups: [],
  nothingGroups: [],
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_GROUP:
      return { ...state, currGroup: action.data };
    case actionTypes.GET_ALL_GROUP:
      return { ...state, searchGroups: action.data };
    case actionTypes.GET_GROUP:
      return { ...state, currGroup: action.data };
    case actionTypes.GET_GROUP_FULL:
      return { ...state, currGroup: action.data };
    case actionTypes.GET_LIKE_GROUP:
      return { ...state, likeGroups: action.data };
    case actionTypes.GET_NOTICE_GROUP:
      return { ...state, noticeGroups: action.data };
    case actionTypes.GET_MY_GROUP:
      return { ...state, myGroups: action.data };
    case actionTypes.GET_NOTHING_GROUP:
      return { ...state, nothingGroups: action.data };
    case actionTypes.SEARCH_GROUP:
      return { ...state, searchGroups: action.data };
    default:
      break;
  }
  return state;
};

export default groupReducer;
