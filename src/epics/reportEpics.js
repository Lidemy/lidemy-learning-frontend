import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const getReportList = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_REPORT_LIST),
    switchMap(action =>
      from(api.getReportList(action.payload)).pipe(
        map(res =>
          Actions.GET_REPORT_LIST_RESULT(null, res.data, action.payload)
        ),
        catchError(err => of(Actions.GET_REPORT_LIST_RESULT(err.message)))
      )
    )
  );

export const getReport = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_REPORT),
    switchMap(action =>
      from(api.getReport(action.id)).pipe(
        map(res => Actions.GET_REPORT_RESULT(res.data)),
        catchError(err => of(Actions.GET_REPORT_RESULT(err.message)))
      )
    )
  );

export const createReport = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_REPORT),
    switchMap(action =>
      from(api.createReport(action.payload)).pipe(
        map(data => Actions.CREATE_REPORT_RESULT(null)),
        catchError(err => of(Actions.CREATE_REPORT_RESULT(err.message)))
      )
    )
  );

export const deleteReport = action$ =>
  action$.pipe(
    ofType(ActionTypes.DELETE_REPORT),
    switchMap(action =>
      from(api.deleteReport(action.id)).pipe(
        map(data => Actions.DELETE_REPORT_RESULT(null)),
        catchError(err => of(Actions.DELETE_REPORT_RESULT(err.message)))
      )
    )
  );

export const updateReport = action$ =>
  action$.pipe(
    ofType(ActionTypes.UPDATE_REPORT),
    switchMap(action =>
      from(api.updateReport(action.id, action.payload)).pipe(
        map(data => Actions.UPDATE_REPORT_RESULT(null)),
        catchError(err => of(Actions.UPDATE_REPORT_RESULT(err.message)))
      )
    )
  );
