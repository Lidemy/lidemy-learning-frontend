const tokenName = "lidemy-oj";
const tempReport = "temp-report";
const showAllReport = "show-all-report";
const showOneColumn = "show-one-column";
const lastReadId = "last-read-id";
const templateKey = "report-template";

const isLocalStorageAvailable = () => {
  try {
    window.localStorage.setItem("test", "test");
    window.localStorage.removeItem("test");
    return true;
  } catch (e) {
    return false;
  }
};

const storage = {
  isAuthenticated: () => storage.get(tokenName) !== null,

  setTemplates: (templates = []) => {
    storage.set(templateKey, JSON.stringify(templates));
  },

  getTemplates: () => {
    const content = storage.get(templateKey) || [];
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  },

  setLastReadId: id => {
    storage.set(lastReadId, id);
  },

  getLastReadId: id => {
    return parseInt(storage.get(lastReadId), 10) || 0;
  },

  setTempReport: text => {
    storage.set(tempReport, text);
  },

  getTempReport: text => {
    return storage.get(tempReport);
  },

  setShowAllReport: bool => {
    storage.set(showAllReport, bool ? "yes" : "no");
  },

  getShowAllReport: () => {
    return storage.get(showAllReport) === "yes";
  },

  setShowOneColumn: bool => {
    storage.set(showOneColumn, bool ? "yes" : "no");
  },

  getShowOneColumn: () => {
    return storage.get(showOneColumn) === "yes";
  },

  setToken: token => {
    storage.set(tokenName, token);
  },

  getToken: () => {
    return storage.get(tokenName);
  },

  get: key => {
    if (isLocalStorageAvailable()) {
      return window.localStorage.getItem(key);
    }

    const regex = new RegExp(
      "(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"
    );
    const cookie = document.cookie.replace(regex, "$1");
    if (cookie) {
      return cookie;
    }
    return null;
  },

  set: (key, value) => {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(key, value);
      return;
    }
    const date = new Date();
    date.setTime(date.getTime() + 86400000);
    document.cookie = `${key}=${value};expires=${date.toGMTString()}`;
    return;
  },

  remove: key => {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
      return;
    }
    const expiry = "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = `${key}${expiry}`;
    return;
  }
};

export default storage;
