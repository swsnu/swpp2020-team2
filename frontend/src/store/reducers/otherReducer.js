import * as actionTypes from '../actions/actionTypes';

const initialState = {
  universities:[],
  departments:[],
};

const otherReducer=(state=initialState,action)=>{
  switch(action.type){
    case actionTypes.GET_UNIVERSITIES:
      return {...state,university:action.data};
    default:
      break;
  }
  return state;
}

export default otherReducer;