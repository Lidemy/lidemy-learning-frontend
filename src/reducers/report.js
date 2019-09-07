import { ActionTypes } from "../actions";
import uniqBy from "lodash/uniqBy";

const defaultState = {
  reportList: [],
  report: {},
  isLoadingGetReportList: false,
  isLoadingGetReport: false,
  isLoadingCreateReport: false,
  isLoadingDeleteReport: false,
  isLoadingUpdateReport: false,
  getReportListError: null,
  getReportError: null,
  updateReportError: null,
  createReportError: null
};

function reportReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_REPORT:
      return {
        ...state,
        isLoadingCreateReport: true,
        createReportError: null
      };

    case ActionTypes.CREATE_REPORT_RESULT:
      return {
        ...state,
        isLoadingCreateReport: false,
        createReportError: action.error
      };

    case ActionTypes.GET_REPORT_LIST:
      return {
        ...state,
        isLoadingGetReportList: true,
        getReportListError: null
      };

    case ActionTypes.GET_REPORT_LIST_RESULT:
      return {
        ...state,
        isLoadingGetReportList: false,
        getReportListError: action.error,
        reportList:
          action.params.page === 1
            ? action.list
            : uniqBy([...state.reportList, ...action.list], "id")
      };

    case ActionTypes.CLEAR_REPORT_LIST:
      return {
        ...state,
        reportList: []
      };

    case ActionTypes.DELETE_REPORT:
      return {
        ...state,
        isLoadingDeleteReport: true
      };

    case ActionTypes.DELETE_REPORT_RESULT:
      return {
        ...state,
        isLoadingDeleteReport: false
      };

    case ActionTypes.GET_REPORT:
      return {
        ...state,
        isLoadingGetReport: true,
        getReportError: null
      };

    case ActionTypes.GET_REPORT_RESULT:
      return {
        ...state,
        isLoadingGetReport: false,
        report: action.item
      };

    case ActionTypes.UPDATE_REPORT:
      return {
        ...state,
        isLoadingUpdateReport: true,
        updateReportError: null
      };

    case ActionTypes.UPDATE_REPORT_RESULT:
      return {
        ...state,
        isLoadingUpdateReport: false,
        updateReportError: action.error
      };

    default:
      return state;
  }
}

export { reportReducer, defaultState };
