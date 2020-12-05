import * as actionTypes from '../actions/actionTypes';

const initialState={
  categories:[],
};

const otherReducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.GET_CATEGORIES:
      return {...state,categories:action.data};
    default:
      break;
  }
  return state;
};

export default otherReducer;