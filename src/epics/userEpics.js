import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const progressUp = action$ =>
  action$.pipe(
    ofType(ActionTypes.PROGRESS_UP),
    switchMap(action =>
      from(api.progressUp()).pipe(
        map(data => Actions.PROGRESS_UP_RESULT(null)),
        catchError(err => of(Actions.PROGRESS_UP_RESULT(err.message)))
      )
    )
  );

export const progressDown = action$ =>
  action$.pipe(
    ofType(ActionTypes.PROGRESS_DOWN),
    switchMap(action =>
      from(api.progressDown()).pipe(
        map(data => Actions.PROGRESS_DOWN_RESULT(null)),
        catchError(err => of(Actions.PROGRESS_DOWN_RESULT(err.message)))
      )
    )
  );

export const getUserProfile = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_USER_PROFILE),
    switchMap(action =>
      from(api.getUserProfile(action.userId)).pipe(
        map(resp => Actions.GET_USER_PROFILE_RESULT(null, resp.data)),
        catchError(err => of(Actions.GET_USER_PROFILE_RESULT(err.message)))
      )
    )
  );

export const getUserReports = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_USER_REPORTS),
    switchMap(action =>
      from(api.getUserReports(action.userId, action.page)).pipe(
        map(res => Actions.GET_USER_REPORTS_RESULT(null, res.data)),
        catchError(err => of(Actions.GET_USER_REPORTS_RESULT(err.message)))
      )
    )
  );

export const updateUser = action$ =>
  action$.pipe(
    ofType(ActionTypes.UPDATE_USER),
    switchMap(action =>
      from(api.updateUser(action.id, action.payload)).pipe(
        map(data => Actions.UPDATE_USER_RESULT(null)),
        catchError(err => of(Actions.UPDATE_USER_RESULT(err.message)))
      )
    )
  );
