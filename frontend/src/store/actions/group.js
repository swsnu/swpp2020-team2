import axios from 'axios';
import * as actionTypes from './actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const createGroup_ = (data) => ({ type: actionTypes.CREATE_GROUP, data });

export const createGroup = (args) => (dispatch) => axios.post('/api/group/create/', {
  name: args.name,
  king: args.king,
  description: args.description,
})
  .then((res) => {
    dispatch(createGroup_(res.data));
  });

export const getAllGroup_ = (data) => ({ type: actionTypes.GET_ALL_GROUP, data });

export const getAllGroup = () => (dispatch) => axios.get('/api/group/simple/')
  .then((res) => {
    dispatch(getAllGroup_(res.data));
  });

export const getGroup_ = (data) => ({ type: actionTypes.GET_GROUP, data });

export const getGroup = (id) => (dispatch) => axios.get(`/api/group/${id}/`)
  .then((res) => {
    dispatch(getGroup_(res.data));
  });

export const getGroupFull_=(data) => ({type:actionTypes.GET_GROUP_FULL,data});

export const getGroupFull = (id) => (dispatch)=>axios.get(`/api/group/${id}/full/`)
.then((res)=>{
  dispatch(getGroupFull_(res.data));
});

export const getLikeGroup_ = (data) => ({ type: actionTypes.GET_LIKE_GROUP, data });

export const getLikeGroup = () => (dispatch) => axios.post('/api/group/filtered/', {
  filter_options: {
    group: ['like'],
  },
  sort_options: [],
  count_options: {},
})
  .then((res) => {
    dispatch(getLikeGroup_(res.data));
  });

export const getNoticeGroup_ = (data) => ({ type: actionTypes.GET_NOTICE_GROUP, data });

export const getNoticeGroup = () => (dispatch) => axios.post('/api/group/filtered/', {
  filter_options: {
    group: ['notification'],
  },
  sort_options: [],
  count_options: {},
})
  .then((res) => {
    dispatch(getNoticeGroup_(res.data));
  });

export const getMyGroup_ = (data) => ({ type: actionTypes.GET_MY_GROUP, data });

export const getMyGroup = () => (dispatch) => axios.post('/api/group/filtered/', {
  including: [],
  filter_options: {
    group: ['my'],
  },
  sort_options: [],
  count_options: {},
})
  .then((res) => {
    dispatch(getMyGroup_(res.data));
  });

export const getNothingGroup_ = (data) => ({ type: actionTypes.GET_NOTHING_GROUP, data });

export const getNothingGroup = () => (dispatch) => axios.post('/api/group/filtered/', {
  including: [],
  filter_options: {
    group: ['nothing'],
  },
  sort_options: [],
  count_options: {num:5},
})
  .then((res) => {
    dispatch(getNothingGroup_(res.data));
  });

export const searchGroup_ = (data) => ({ type: actionTypes.SEARCH_GROUP, data });

export const searchGroup = (query) => (dispatch) => axios.get(`/api/group/search/${query}/`)
  .then((res) => {
    dispatch(searchGroup_(res.data));
  });

export const reportGroup = (id, content) => (dispatch) => axios.post('/api/group_report/', {
  group: id,
  content,
}).then((res) => {
  if (res.status === 201) alert('신고가 접수되었습니다.');
  else alert('예상치 못한 오류로 신고접수가 실패하였습니다. 잠시 뒤에 재시도해주세요');
});

export const changeGroupInfo = (id, name, description) => (dispatch) => axios.put(`/api/group/${id}/change_info/`, {
  name,
  description,
});

export const changeGroupPrivacy = (id, privacy) => (dispatch) => axios.put(`/api/group/${id}/change_privacy/`, { privacy });

export const handleJoinRequest = (groupId, userId, op) => (dispatch) => axios.put(`/api/group/${groupId}/join_request/`, {
  user: userId,
  operation: op
});

export const manageMember = (groupId, userId, op) => (dispatch) => axios.put(`/api/group/${groupId}/member/`, {
  user: userId,
  operation: op,
});

export const manageAdmin = (groupId, userId, op) => (dispatch) => axios.put(`/api/group/${groupId}/admin/`, {
  user: userId,
  operation: op,
});
