import * as actionTypes from '../actions/actionTypes';

const initialState = {
  events: [],
  target: {},
  selectedImage:[],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_EVENT:
      return { ...state, events: action.events };
    case actionTypes.GET_EVENT:
      return { ...state, target: action.target };


    case actionTypes.POST_IMAGE:
      //let newImages = [...state.selectedImage, action.data] 이거는 멀티 이미지 올릴 때
      return { ...state, selectedImage: action.data };

    case actionTypes.CREATE_EVENT:
      const newEvents = [...state.events, action.event];
      return { ...state, events: newEvents, selectedImage:[] };

    default:
      break;
  }
  return state;
};

export default eventReducer;
