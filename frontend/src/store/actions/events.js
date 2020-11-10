import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const getEvent_ = (event) => ({
  type: actionTypes.GET_EVENT,
  target: event,
});

export const getEvent = (id) => (dispatch) => axios.get(`api/event/${id}/`)
  .then((res) => dispatch(getEvent_(res.data)));

/*
export const postEvent_=(event)=>{
    return{
        type:actionTypes.POST_EVENT,
        target:event
    }
}

export const postEvent=(args)=>{
    return dispatch=>{
        return axios.post('api/event/upload/')
        .then(res=>dispatch(postEvent_(res.data)));
    }
}
*/
