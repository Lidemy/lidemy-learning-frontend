import React from "react";
import { connect } from "react-redux";
import Guest from "../components/guest";
import { Actions } from "../actions";

const GuestContainer = props => <Guest {...props} />;

const mapDispatchToProps = {
  register: Actions.REGISTER
};

const mapStateToProps = state => ({
  isLoadingRegister: state.auth.isLoadingRegister,
  isLogin: state.auth.isLogin,
  registerResult: state.auth.registerResult,
  isLoadingGetUser: state.auth.isLoadingGetUser
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuestContainer);
