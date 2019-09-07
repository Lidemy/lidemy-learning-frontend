const isProduction = process.env.NODE_ENV === "production";

const config = {
  firebase: {
    apiKey: "AIzaSyDBf0LKAocA4kHPug9-_SH7Fa1ypY34uD0",
    authDomain: "lidemy-learning.firebaseapp.com",
    databaseURL: "https://lidemy-learning.firebaseio.com",
    projectId: "lidemy-learning",
    storageBucket: "lidemy-learning.appspot.com",
    messagingSenderId: "623325319301"
  },
  apiHost: "https://learning-api.qootest.com/v1"
};

export default config;
