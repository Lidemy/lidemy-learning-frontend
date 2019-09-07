import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const getNewsList = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_NEWS_LIST),
    switchMap(action =>
      from(api.getNewsList(action.payload)).pipe(
        map(res => Actions.GET_NEWS_LIST_RESULT(null, res.data)),
        catchError(err => of(Actions.GET_NEWS_LIST_RESULT(err.message)))
      )
    )
  );

export const getNews = action$ =>
  action$.pipe(
    ofType(ActionTypes.GET_NEWS),
    switchMap(action =>
      from(api.getNews(action.id)).pipe(
        map(res => Actions.GET_NEWS_RESULT(res.data)),
        catchError(err => of(Actions.GET_NEWS_RESULT(err.message)))
      )
    )
  );

export const createNews = action$ =>
  action$.pipe(
    ofType(ActionTypes.CREATE_NEWS),
    switchMap(action =>
      from(api.createNews(action.payload)).pipe(
        map(data => Actions.CREATE_NEWS_RESULT(null)),
        catchError(err => of(Actions.CREATE_NEWS_RESULT(err.message)))
      )
    )
  );

export const deleteNews = action$ =>
  action$.pipe(
    ofType(ActionTypes.DELETE_NEWS),
    switchMap(action =>
      from(api.deleteNews(action.id)).pipe(
        map(data => Actions.DELETE_NEWS_RESULT(null)),
        catchError(err => of(Actions.DELETE_NEWS_RESULT(err.message)))
      )
    )
  );

export const updateNews = action$ =>
  action$.pipe(
    ofType(ActionTypes.UPDATE_NEWS),
    switchMap(action =>
      from(api.updateNews(action.id, action.payload)).pipe(
        map(data => Actions.UPDATE_NEWS_RESULT(null)),
        catchError(err => of(Actions.UPDATE_NEWS_RESULT(err.message)))
      )
    )
  );
