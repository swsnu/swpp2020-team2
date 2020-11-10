import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getEvent_ = (event) =>{
    return{
        type: actionTypes.GET_EVENT,
        target: event
    }
}

export const getEvent = (id) => {
    return dispatch =>{
        return axios.get('/api/event/'+id)
            .then(res=> dispatch(getEvent_(res.data)));
    }
}