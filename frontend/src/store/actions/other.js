import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const getCategories_=(data)=>({type:actionTypes.GET_CATEGORIES,data});

export const getCategories=()=>(dispatch)=>axios.get('/api/category/')
.then((res)=>{
  dispatch(getCategories_(res.data));
});