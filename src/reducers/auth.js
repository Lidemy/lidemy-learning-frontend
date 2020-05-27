import { ActionTypes } from "../actions";

const defaultState = {
  error: null,
  loginStatus: "LOADING",
  isLogin: false,
  user: null,
  isLoadingRegister: false,
  isLoadingCreateInvite: false,
  registerResult: null,
  inviteResult: null,
  isLoadingGetUser: false
};

function authReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_CHECK_LOGIN_STATUS:
      return {
        ...state,
        loginStatus: action.status
      };

    case ActionTypes.SET_USER_AUTHENTICATED:
      return {
        ...state,
        isLogin: action.isLogin
      };

    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        isLoadingGetUser: false
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLogin: false,
        user: null
      };

    case ActionTypes.REGISTER:
      return {
        ...state,
        isLoadingRegister: true,
        registerResult: null
      };

    case ActionTypes.REGISTER_RESULT:
      return {
        ...state,
        isLoadingRegister: false,
        registerResult: action.result
      };

    case ActionTypes.CREATE_INVITE:
      return {
        ...state,
        isLoadingCreateInvite: true,
        inviteResult: null
      };

    case ActionTypes.CREATE_INVITE_RESULT:
      return {
        ...state,
        isLoadingCreateInvite: false,
        inviteResult: action.token
      };

    case ActionTypes.GET_CURRENT_USER:
      return {
        ...state,
        isLoadingGetUser: true
      };

    case ActionTypes.GET_USER_FAILED:
      return {
        ...state,
        isLoadingGetUser: false
      };

    default:
      return state;
  }
}

export { authReducer, defaultState };
