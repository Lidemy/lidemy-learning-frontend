import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Header from "../components/header";
import { Actions } from "../actions";

const HeaderContainer = props => <Header {...props} />;

const mapStateToProps = store => ({
  loginStatus: store.auth.loginStatus,
  isLogin: store.auth.isLogin,
  user: store.auth.user,
  isLoadingUpdateUser: store.user.isLoadingUpdateUser,
  updateUserError: store.user.updateUserError
});

const mapDispatchToProps = {
  logout: Actions.LOGOUT,
  updateUser: Actions.UPDATE_USER,
  getCurrentUser: Actions.GET_CURRENT_USER
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HeaderContainer)
);
