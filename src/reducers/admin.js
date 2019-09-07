import { ActionTypes } from "../actions";

const defaultState = {
  newsList: [],
  news: {},
  isLoadingGetNewsList: false,
  isLoadingGetNews: false,
  isLoadingCreateNews: false,
  isLoadingDeleteNews: false,
  isLoadingUpdateNews: false,
  getNewsListError: null,
  getNewsError: null,
  updateNewsError: null,
  createNewsError: null
};

function adminReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_NEWS:
      return {
        ...state,
        isLoadingCreateNews: true,
        createNewsError: null
      };

    case ActionTypes.CREATE_NEWS_RESULT:
      return {
        ...state,
        isLoadingCreateNews: false,
        createNewsError: action.error
      };

    case ActionTypes.GET_NEWS_LIST:
      return {
        ...state,
        isLoadingGetNewsList: true,
        getNewsListError: null
      };

    case ActionTypes.GET_NEWS_LIST_RESULT:
      return {
        ...state,
        isLoadingGetNewsList: false,
        getNewsListError: action.error,
        newsList: action.list
      };

    case ActionTypes.DELETE_NEWS:
      return {
        ...state,
        isLoadingDeleteNews: true
      };

    case ActionTypes.DELETE_NEWS_RESULT:
      return {
        ...state,
        isLoadingDeleteNews: false
      };

    case ActionTypes.GET_NEWS:
      return {
        ...state,
        isLoadingGetNews: true,
        getNewsError: null
      };

    case ActionTypes.GET_NEWS_RESULT:
      return {
        ...state,
        isLoadingGetNews: false,
        news: action.item
      };

    case ActionTypes.UPDATE_NEWS:
      return {
        ...state,
        isLoadingUpdateNews: true,
        updateNewsError: null
      };

    case ActionTypes.UPDATE_NEWS_RESULT:
      return {
        ...state,
        isLoadingUpdateNews: false,
        updateNewsError: action.error
      };

    default:
      return state;
  }
}

export { adminReducer, defaultState };
