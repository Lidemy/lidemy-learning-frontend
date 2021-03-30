import EasyActions from "redux-easy-actions";

const { Actions, Constants } = EasyActions({
  SET_CHECK_LOGIN_STATUS(type, status) {
    return { type, status };
  },

  SET_USER_AUTHENTICATED(type, isLogin) {
    return { type, isLogin };
  },

  SET_USER(type, user) {
    return { type, user };
  },

  LOGOUT(type) {
    return { type };
  },

  GET_CURRENT_USER(type) {
    return { type };
  },

  GET_USER_FAILED(type, error) {
    return { type, error };
  },

  UPDATE_USER(type, id, payload) {
    return { type, id, payload };
  },

  UPDATE_USER_RESULT(type, error) {
    return { type, error };
  },

  // progress
  PROGRESS_UP(type) {
    return { type };
  },

  PROGRESS_UP_RESULT(type, error) {
    return { type, error };
  },

  PROGRESS_DOWN(type) {
    return { type };
  },

  PROGRESS_DOWN_RESULT(type, error) {
    return { type, error };
  },

  UPDATE_PROGRESS(type, progress, token) {
    return { type, progress, token };
  },

  UPDATE_PROGRESS_RESULT(type, error) {
    return { type, error };
  },

  GET_PROGRESS(type, userId) {
    return { type, userId };
  },

  GET_PROGRESS_RESULT(type, list, error) {
    return { type, list, error };
  },

  // register
  REGISTER(type, code) {
    return { type, code };
  },

  REGISTER_RESULT(type, result) {
    return { type, result };
  },

  CREATE_INVITE(type, payload) {
    return { type, payload };
  },

  CREATE_INVITE_RESULT(type, token) {
    return { type, token };
  },

  // profile
  GET_USER_PROFILE(type, userId) {
    return { type, userId };
  },

  GET_USER_PROFILE_RESULT(type, error, item) {
    return { type, error, item };
  },

  GET_USER_REPORTS(type, userId, page) {
    return { type, userId, page };
  },

  GET_USER_REPORTS_RESULT(type, error, data) {
    return { type, error, data };
  },

  // news
  CREATE_NEWS(type, payload) {
    return { type, payload };
  },

  CREATE_NEWS_RESULT(type, error) {
    return { type, error };
  },

  GET_NEWS_LIST(type, payload) {
    return { type, payload };
  },

  GET_NEWS_LIST_RESULT(type, error, list) {
    return { type, error, list };
  },

  DELETE_NEWS(type, id) {
    return { type, id };
  },

  DELETE_NEWS_RESULT(type, error) {
    return { type, error };
  },

  GET_NEWS(type, id) {
    return { type, id };
  },

  GET_NEWS_RESULT(type, item) {
    return { type, item };
  },

  UPDATE_NEWS(type, id, payload) {
    return { type, id, payload };
  },

  UPDATE_NEWS_RESULT(type, error) {
    return { type, error };
  },

  // report
  CREATE_REPORT(type, payload) {
    return { type, payload };
  },

  CREATE_REPORT_RESULT(type, error) {
    return { type, error };
  },

  GET_REPORT_LIST(type, payload) {
    return { type, payload };
  },

  GET_REPORT_LIST_RESULT(type, error, list, params) {
    return { type, error, list, params };
  },

  CLEAR_REPORT_LIST(type) {
    return { type };
  },

  DELETE_REPORT(type, id) {
    return { type, id };
  },

  DELETE_REPORT_RESULT(type, error) {
    return { type, error };
  },

  GET_REPORT(type, id) {
    return { type, id };
  },

  GET_REPORT_RESULT(type, item) {
    return { type, item };
  },

  UPDATE_REPORT(type, id, payload) {
    return { type, id, payload };
  },

  UPDATE_REPORT_RESULT(type, error) {
    return { type, error };
  },

  // TA
  TOGGLE_TA_STATUS(type) {
    return { type };
  },

  TOGGLE_TA_STATUS_RESULT(type, error) {
    return { type, error };
  },

  GET_TA_LIST(type) {
    return { type };
  },

  GET_TA_LIST_RESULT(type, error, list) {
    return { type, error, list };
  },

  // homework
  CREATE_HOMEWORK(type, payload) {
    return { type, payload };
  },

  CREATE_HOMEWORK_RESULT(type, error) {
    return { type, error };
  },

  GET_HOMEWORKS(type, payload) {
    return { type, payload };
  },

  GET_HOMEWORKS_RESULT(type, error, list, count) {
    return { type, error, list, count };
  },

  GET_HOMEWORKS_ACHIEVEDATA(type) {
    return { type };
  },

  GET_HOMEWORKS_ACHIEVEDATA_RESULT(type, error, list) {
    return { type, error, list };
  },

  LIKE_HOMEWORK(type, id) {
    return { type, id };
  },

  LIKE_HOMEWORK_RESULT(type, error) {
    return { type, error };
  },

  ACHIEVE_HOMEWORK(type, id) {
    return { type, id };
  },

  ACHIEVE_HOMEWORK_RESULT(type, error) {
    return { type, error };
  },

  CLEAR_HOMEWORKS(type) {
    return { type };
  },

  // note
  GET_NOTE_LIST(type, payload) {
    return { type, payload };
  },

  GET_NOTE_LIST_RESULT(type, error, list) {
    return { type, error, list };
  },

  CREATE_NOTE(type, payload) {
    return { type, payload };
  },

  CREATE_NOTE_RESULT(type, error) {
    return { type, error };
  },

  DELETE_NOTE(type, id) {
    return { type, id };
  },

  DELETE_NOTE_RESULT(type, error) {
    return { type, error };
  },
});

export { Actions, Constants as ActionTypes };
