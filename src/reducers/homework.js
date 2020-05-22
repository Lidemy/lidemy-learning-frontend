import { ActionTypes } from "../actions";

const defaultState = {
  homeworks: [],
  homeworksAchieveData: [],
  counts: 0,
  isLoadingGetHomeworks: false,
  isLoadingCreateHomework: false,
  isLoadingUpdateHomework: false,
  isLoadingGetHomeworksAchieveData: false,
  getHomeworksError: null,
  getHomeworksAchieveDataError: null,
  createHomeworkError: null,
  homeworkUpdateError: null
};

function homeworkReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_HOMEWORK:
      return {
        ...state,
        isLoadingCreateHomework: true,
        createHomeworkError: null
      };

    case ActionTypes.CREATE_HOMEWORK_RESULT:
      return {
        ...state,
        isLoadingCreateHomework: false,
        createHomeworkError: action.error
      };

    case ActionTypes.GET_HOMEWORKS:
      return {
        ...state,
        isLoadingGetHomeworks: true,
        getHomeworksError: null
      };

    case ActionTypes.GET_HOMEWORKS_RESULT:
      return {
        ...state,
        isLoadingGetHomeworks: false,
        getHomeworksError: action.error,
        homeworks: action.list,
        count: action.count
      };

    case ActionTypes.GET_HOMEWORKS_ACHIEVEDATA:
      return {
        ...state,
        isLoadingGetHomeworksAchieveData: true,
        getHomeworksAchieveDataError: null
      };

    case ActionTypes.GET_HOMEWORKS_ACHIEVEDATA_RESULT:
      return {
        ...state,
        isLoadingGetHomeworksAchieveData: false,
        getHomeworksAchieveDataError: action.error,
        homeworksAchieveData: action.list
      };

    case ActionTypes.LIKE_HOMEWORK:
    case ActionTypes.ACHIEVE_HOMEWORK:
      return {
        ...state,
        isLoadingUpdateHomework: true,
        homeworkUpdateError: null
      };

    case ActionTypes.LIKE_HOMEWORK_RESULT:
    case ActionTypes.ACHIEVE_HOMEWORK_RESULT:
      return {
        ...state,
        isLoadingUpdateHomework: false,
        homeworkUpdateError: action.error
      };

    default:
      return state;
  }
}

export { homeworkReducer, defaultState };
