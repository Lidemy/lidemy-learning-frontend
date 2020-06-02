import { ofType } from "redux-observable";
import { of, from, throwError } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";

import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const registerEpic = action$ =>
  action$.pipe(
    ofType(ActionTypes.REGISTER),
    switchMap(action =>
      from(api.register(action.code)).pipe(
        map(() => Actions.REGISTER_RESULT("success")),
        catchError(err => throwError(err))
      )
    ),
    catchError(err => of(Actions.REGISTER_RESULT(err.response.data.error)))
  );

export const createInviteLinkEpic = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_INVITE),
    switchMap(action =>
      from(api.createInviteLink(action.payload)).pipe(
        map(res => Actions.CREATE_INVITE_RESULT(res.data.token)),
        catchError(err => of(Actions.CREATE_INVITE_RESULT(err.message)))
      )
    )
  );

export const getCurrentUser = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_CURRENT_USER),
    mergeMap(action =>
      from(api.getUser()).pipe(
        map(resp => Actions.SET_USER(resp.data)),
        catchError(err => of(Actions.GET_USER_FAILED(err.message)))
      )
    )
  );
