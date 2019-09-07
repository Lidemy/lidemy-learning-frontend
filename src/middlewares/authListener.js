import jwtDecode from "jwt-decode";
import { firebaseApp } from "../utils/firebase";
import storage from "../utils/storage";

const authListener = () => next => action => {
  const token = storage.getToken();
  if (!token) {
    return next(action);
  }

  const { exp } = jwtDecode(token);
  const isExpired = Date.now() / 1000 > exp;
  if (!isExpired) {
    return next(action);
  }

  if (!firebaseApp.auth().currentUser) {
    return next(action);
  }

  return firebaseApp
    .auth()
    .currentUser.getIdToken()
    .then(token => storage.setToken(token))
    .then(() => next(action))
    .catch(error => {
      // eslint-disable-next-line no-console
      console.warn(error);
      return next(action);
    });
};

export default authListener;
