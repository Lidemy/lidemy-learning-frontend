import React from "react";
import { connect } from "react-redux";
import Profile from "../components/profile";
import { Actions } from "../actions";

const ProfileContainer = props => <Profile {...props} />;

const mapStateToProps = store => ({
  user: store.auth.user,
  userProfile: store.user.userProfile,
  isLoadingGetUserProfile: store.user.isLoadingGetUserProfile,
  getUserProfileError: store.user.getUserProfileError,

  isLoadingGetUserReports: store.user.isLoadingGetUserReports,
  getUserReportsError: store.user.getUserReportsError,
  userReports: store.user.userReports,
  reportCount: store.user.reportCount,

  isLoadingDeleteReport: store.report.isLoadingDeleteReport,
  isLoadingUpdateReport: store.report.isLoadingUpdateReport
});

const mapDispatchToProps = {
  getUserProfile: Actions.GET_USER_PROFILE,
  getUserReports: Actions.GET_USER_REPORTS,
  deleteReport: Actions.DELETE_REPORT,
  updateReport: Actions.UPDATE_REPORT
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
