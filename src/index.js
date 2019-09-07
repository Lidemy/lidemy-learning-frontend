import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import AuthListener from "./containers/auth_listener";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <AuthListener>
      <App />
    </AuthListener>
  </Provider>,
  document.getElementById("root")
);
