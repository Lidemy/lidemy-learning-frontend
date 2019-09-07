import firebase from "firebase";
import config from "../config";

const firebaseApp = firebase.initializeApp(config.firebase);

const logout = () => firebaseApp.auth().signOut();

const login = () => {
  const provider = new firebase.auth.GithubAuthProvider();
  return firebaseApp.auth().signInWithPopup(provider);
};

export { firebaseApp, login, logout };
