import { ActionTypes } from "../actions";

const defaultState = {
  noteList: [],
  isLoadingGetNoteList: false,
  isLoadingCreateNote: false,
  isLoadingDeleteNote: false,
  getNoteListError: null,
  createNoteError: null,
  deleteNoteError: null,
};

function noteReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_NOTE:
      return {
        ...state,
        isLoadingCreateNote: true,
        createNoteError: null,
      };

    case ActionTypes.CREATE_NOTE_RESULT:
      return {
        ...state,
        isLoadingCreateNote: false,
        createNoteError: action.error,
      };

    case ActionTypes.GET_NOTE_LIST:
      return {
        ...state,
        isLoadingGetNoteList: true,
        getNoteListError: null,
      };

    case ActionTypes.GET_NOTE_LIST_RESULT:
      return {
        ...state,
        isLoadingGetNoteList: false,
        getNoteListError: action.error,
        noteList: action.list,
      };

    case ActionTypes.CLEAR_NOTE_LIST:
      return {
        ...state,
        noteList: [],
      };

    case ActionTypes.DELETE_NOTE:
      return {
        ...state,
        isLoadingDeleteNote: true,
      };

    case ActionTypes.DELETE_NOTE_RESULT:
      return {
        ...state,
        isLoadingDeleteNote: false,
      };

    default:
      return state;
  }
}

export { noteReducer, defaultState };
