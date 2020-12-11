import * as actionTypes from '../actions/actionTypes';

const initialState = {
  signinedUser: null,
  userInfo: null,
  userFullInfo: null,

  likeEvents: [],
  bringEvents: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, signinedUser: action.user.id, userInfo: action.user };
    case actionTypes.SIGN_OUT:
      return {
        ...state, signinedUser: null, userInfo: null, userFullInfo: null,
      };
    case actionTypes.SIGN_UP:
      return state;
    case actionTypes.ACTIVATE:
      return state;
    case actionTypes.GET_USER:
      return { ...state, signinedUser: action.user.id, userInfo: action.user };
    case actionTypes.GET_USER_FULL:
      return { ...state, signinedUser: action.user.id, userFullInfo: action.user };

    case actionTypes.LIKE_EVENT:
      let newLikeEvents = state.likeEvents;
      if (action.oper == 'remove')
        newLikeEvents = state.likeEvents.filter((evtId) => (evtId != action.event_id));
      else if (action.oper == 'add')
        newLikeEvents = [...state.likeEvents, action.event_id]
      return { ...state, likeEvents: newLikeEvents };
    case actionTypes.BRING_EVENT:
      let newBringEvents = state.bringEvents;
      if (action.oper == 'remove')
        newBringEvents = state.bringEvents.filter((evtId) => (evtId != action.event_id));
      else if (action.oper == 'add')
        newBringEvents = [...state.bringEvents, action.event_id]
      return { ...state, bringEvents: newBringEvents };
      
    default:
      break;
  }
  return state;
};

export default userReducer;
