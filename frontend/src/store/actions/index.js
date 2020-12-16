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
  changePassword,
  changeLanguage,
  changeUserInfo,
} from './user';

export {
  getAllEvent,
  getEvent,

  uploadImage,
  createEvent,
  reportEvent,

  getTagRecommend,

} from './events';

export {
  createGroup,
  getAllGroup,
  getGroup,
  getGroupFull,
  getLikeGroup,
  getNoticeGroup,
  getMyGroup,
  searchGroup,
  changeGroupPrivacy,
  manageMember,
  manageAdmin,
} from './group';

export {
  getUniversities,
  getDepartments,
  getCategories,
  getLanguages,

} from './other';
