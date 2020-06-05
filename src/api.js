import axios from "axios";
import config from "./config";
import storage from "./utils/storage";

const modifyParams = obj => {
  Object.keys(obj).forEach(key => {
    if (!obj[key] || obj[key].length === 0) delete obj[key];
    if (Array.isArray(obj[key])) obj[key] = JSON.stringify(obj[key]);
  });
  return { params: obj };
};

const instance = axios.create({
  baseURL: config.apiHost
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${storage.getToken()}`;
  return config;
});

export const getUser = () => instance.get("/users/me");
export const register = code => instance.get("/register?token=" + code);
export const updateUser = (id, params) => instance.put("/users/" + id, params);
export const createInviteLink = payload => instance.post("/invite", payload);

// ta
export const getTAs = () => instance.get("/ta");
export const toggleTA = () => instance.get("/ta/toggle/");

// progress
export const progressUp = () => instance.post("/progress/up");
export const progressDown = () => instance.post("/progress/down");

// report
export const createReport = values => instance.post("/reports", values);
export const getReport = id => instance.get("/reports" + id);
export const getReportList = (params = {}) =>
  instance.get("/reports", { params });
export const deleteReport = id => instance.delete("/reports/" + id);
export const updateReport = (id, params) =>
  instance.put("/reports/" + id, params);

export const getUserReports = (userId, page = 1) =>
  instance.get(`/users/${userId}/reports?page=${page}`);
export const getUserProfile = userId => instance.get("/users/" + userId);

// news, annocuments
export const createNews = values => instance.post("/admin/news", values);
export const getNewsList = (params = {}) => instance.get("/news", { params });
export const deleteNews = id => instance.delete("/admin/news/" + id);
export const getNews = id => instance.get("/admin/news/" + id);
export const updateNews = (id, params) =>
  instance.put("/admin/news/" + id, params);

// homeworks
export const createHomework = payload => instance.post("/homeworks", payload);
export const getHomeworks = (params = {}) =>
  instance.get("/homeworks", modifyParams(params));
export const getHomeworksAchieveData = () =>
  instance.get("/homeworks/achieve/data");
export const likeHomework = id => instance.get("/homeworks/" + id + "/like");
export const achieveHomework = id =>
  instance.get("/homeworks/" + id + "/achieve");
