import { ActionTypes } from "../actions";

const defaultState = {
  homeworks: [],
  isLoadingGetHomeworks: false,
  isLoadingGetTAHomeworks: false,
  isLoadingCreateHomework: false,
  isLoadingUpdateHomework: false,
  getHomeworksError: null,
  getTAHomeworksError: null,
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
        homeworks: action.list
      };

    case ActionTypes.GET_TA_HOMEWORKS:
      return {
        ...state,
        isLoadingGetTAHomeworks: true,
        getTAHomeworksError: null
      };

    case ActionTypes.GET_TA_HOMEWORKS_RESULT:
      return {
        ...state,
        isLoadingGetTAHomeworks: false,
        getTAHomeworksError: action.error,
        homeworks: action.list
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
