import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { Actions } from "../actions";
import storage from "../utils/storage";
import { firebaseApp } from "../utils/firebase";

class AuthListener extends React.Component {
  componentDidMount() {
    const {
      setCheckLoginStatus,
      setUserAuthenticated,
      getCurrentUser
    } = this.props;

    // we can use this to check if user is login or not
    firebaseApp.auth().onAuthStateChanged(user => {
      setCheckLoginStatus(user ? "SUCCESS" : "FAILURE");
      setUserAuthenticated(user ? true : false);
      if (user) {
        user.getIdToken(true).then(token => {
          storage.setToken(token);
          getCurrentUser();
        });
      }
    });
  }

  render() {
    return this.props.children;
  }
}

AuthListener.propTypes = {
  children: PropTypes.any,
  setCheckLoginStatus: PropTypes.func,
  setUserAuthenticated: PropTypes.func
};

const AuthListenerContainer = props => <AuthListener {...props} />;

const mapDispatchToProps = {
  setUserAuthenticated: Actions.SET_USER_AUTHENTICATED,
  setCheckLoginStatus: Actions.SET_CHECK_LOGIN_STATUS,
  getCurrentUser: Actions.GET_CURRENT_USER
};

export default connect(
  null,
  mapDispatchToProps
)(AuthListenerContainer);
