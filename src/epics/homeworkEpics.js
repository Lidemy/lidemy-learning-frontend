import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const getHomeworks = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_HOMEWORKS),
    switchMap(action =>
      from(api.getHomeworks(action.payload)).pipe(
        map(res =>
          Actions.GET_HOMEWORKS_RESULT(null, res.data.rows, res.data.count)
        ),
        catchError(err => of(Actions.GET_HOMEWORKS_RESULT(err.message)))
      )
    )
  );

export const createHomework = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_HOMEWORK),
    switchMap(action =>
      from(api.createHomework(action.payload)).pipe(
        map(data => Actions.CREATE_HOMEWORK_RESULT(null)),
        catchError(err => of(Actions.CREATE_HOMEWORK_RESULT(err.message)))
      )
    )
  );

export const likeHomework = action$ =>
  action$.pipe(
    ofType(ActionTypes.LIKE_HOMEWORK),
    switchMap(action =>
      from(api.likeHomework(action.id)).pipe(
        map(data => Actions.LIKE_HOMEWORK_RESULT(null)),
        catchError(err => of(Actions.LIKE_HOMEWORK_RESULT(err.message)))
      )
    )
  );

export const achieveHomework = action$ =>
  action$.pipe(
    ofType(ActionTypes.ACHIEVE_HOMEWORK),
    switchMap(action =>
      from(api.achieveHomework(action.id)).pipe(
        map(data => Actions.ACHIEVE_HOMEWORK_RESULT(null)),
        catchError(err => of(Actions.ACHIEVE_HOMEWORK_RESULT(err.message)))
      )
    )
  );
