import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const registerEpic = action$ =>
  action$.pipe(
    ofType(ActionTypes.REGISTER),
    mergeMap(action =>
      from(api.register(action.code)).pipe(
        map(() => Actions.REGISTER_RESULT("success")),
        catchError(error => of(Actions.REGISTER_RESULT(null)))
      )
    )
  );

export const getCurrentUser = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_CURRENT_USER),
    mergeMap(action =>
      from(api.getUser()).pipe(
        map(resp => Actions.SET_USER(resp.data)),
        catchError(error => of(Actions.GET_USER_FAILED(error)))
      )
    )
  );
