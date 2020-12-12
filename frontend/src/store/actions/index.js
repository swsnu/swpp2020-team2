export {
  signIn,
  signOut,
  signUp,
  activate,
  getUser,
  getUserFull,
  likeGroup,
  noticeGroup,
  joinGroup,

  bringEvent,
  likeEvent,
} from './user';

export {
  getAllEvent,
  getEvent,
  createEvent,
  reportEvent,

} from './events';

export {
  createGroup,
  getAllGroup,
  getGroup,
  getLikeGroup,
  getNoticeGroup,
  getMyGroup,
  searchGroup,
} from './group';

export {
  getUniversities,
  getDepartments,
  getCategories,
} from './other';
