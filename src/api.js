import axios from "axios";
import config from "./config";
import storage from "./utils/storage";

const instance = axios.create({
  baseURL: config.apiHost
});

instance.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${storage.getToken()}`;
  return config;
});

export const getUser = () => instance.get("/users/me");
export const register = code =>
  instance.post("/register", {
    code
  });
export const updateUser = (id, params) => instance.put("/users/" + id, params);

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
