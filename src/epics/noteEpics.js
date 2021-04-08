import { ofType } from "redux-observable";
import { of, from } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";

import { ActionTypes, Actions } from "../actions";
import * as api from "../api";

export const getNoteList = (action$) =>
  action$.pipe(
    ofType(ActionTypes.GET_NOTE_LIST),
    switchMap((action) =>
      from(api.getNoteList(action.payload)).pipe(
        map((res) => Actions.GET_NOTE_LIST_RESULT(null, res.data)),
        catchError((err) => of(Actions.GET_NOTE_LIST_RESULT(err.message)))
      )
    )
  );

export const createNote = (action$) =>
  action$.pipe(
    ofType(ActionTypes.CREATE_NOTE),
    switchMap((action) =>
      from(api.createNote(action.payload)).pipe(
        map((data) => Actions.CREATE_NOTE_RESULT(null)),
        catchError((err) => of(Actions.CREATE_NOTE_RESULT(err.message)))
      )
    )
  );

export const deleteNote = (action$) =>
  action$.pipe(
    ofType(ActionTypes.DELETE_NOTE),
    switchMap((action) =>
      from(api.deleteNote(action.id)).pipe(
        map((data) => Actions.DELETE_NOTE_RESULT(null)),
        catchError((err) => of(Actions.DELETE_NOTE_RESULT(err.message)))
      )
    )
  );
