import { ActionTypes } from "../actions";

const defaultState = {
  isLoadingUpdateProgress: false,
  progressUpdateError: null,
  isLoadingGetProgress: false,
  progressList: [],
  getProgressListError: null,

  isLoadingGetUserProfile: false,
  isLoadingGetTAList: false,
  getTAListError: false,

  userProfile: null,
  getUserProfileError: null,

  TAList: [],
  userReports: [],
  isLoadingGetUserReports: false,
  getUserReportsError: null,
  reportCount: 0,

  isLoadingUpdateUser: false,
  updateUserError: null,
};

function userReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_PROGRESS:
    case ActionTypes.PROGRESS_UP:
    case ActionTypes.PROGRESS_DOWN:
      return {
        ...state,
        isLoadingUpdateProgress: true,
        progressUpdateError: null,
      };

    case ActionTypes.UPDATE_PROGRESS_RESULT:
    case ActionTypes.PROGRESS_UP_RESULT:
    case ActionTypes.PROGRESS_DOWN_RESULT:
      return {
        ...state,
        isLoadingUpdateProgress: false,
        progressUpdateError: action.error,
      };

    case ActionTypes.GET_PROGRESS:
      return {
        ...state,
        isLoadingGetProgress: true,
      };

    case ActionTypes.GET_PROGRESS_RESULT:
      return {
        ...state,
        isLoadingGetProgress: false,
        progressList: action.list,
        getProgressListError: action.error,
      };

    case ActionTypes.GET_USER_PROFILE:
      return {
        ...state,
        isLoadingGetUserProfile: true,
        userProfile: null,
        getUserProfileError: null,
      };

    case ActionTypes.GET_USER_PROFILE_RESULT:
      return {
        ...state,
        isLoadingGetUserProfile: false,
        userProfile: action.item,
        getUserProfileError: action.error,
      };

    case ActionTypes.GET_USER_REPORTS:
      return {
        ...state,
        isLoadingGetUserReports: true,
        getUserReportsError: null,
      };

    case ActionTypes.GET_USER_REPORTS_RESULT:
      return {
        ...state,
        isLoadingGetUserReports: false,
        getUserReportsError: action.error,
        userReports: action.data.reports,
        reportCount: action.data.count,
      };

    case ActionTypes.UPDATE_USER:
    case ActionTypes.TOGGLE_TA_STATUS:
      return {
        ...state,
        isLoadingUpdateUser: true,
        updateUserError: null,
      };

    case ActionTypes.UPDATE_USER_RESULT:
    case ActionTypes.TOGGLE_TA_STATUS_RESULT:
      return {
        ...state,
        isLoadingUpdateUser: false,
        updateUserError: action.error,
      };

    case ActionTypes.GET_TA_LIST:
      return {
        ...state,
        isLoadingGetTAList: true,
        getTAListError: null,
      };

    case ActionTypes.GET_TA_LIST_RESULT:
      return {
        ...state,
        isLoadingGetTAList: false,
        getTAListError: action.error,
        TAList: action.list,
      };

    default:
      return state;
  }
}

export { userReducer, defaultState };
