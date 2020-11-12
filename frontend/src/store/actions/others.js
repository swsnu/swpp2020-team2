import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const getUniversities_=(data)=>({type:actionTypes.GET_UNIVERSITIES, data});

export const getUniversities=()=>(dispatch)=>axios.get('/api/university/')
.then((res)=>{
  dispatch(getUniversities_(res.data));
})