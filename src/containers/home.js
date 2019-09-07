import React from "react";
import { connect } from "react-redux";
import Home from "../components/home";
import { Actions } from "../actions";

const HomeContainer = props => <Home {...props} />;

const mapStateToProps = store => ({
  user: store.auth.user,
  isLoadingGetNewsList: store.admin.isLoadingGetNewsList,
  newsList: store.admin.newsList,
  isLoadingUpdateProgress: store.user.isLoadingUpdateProgress,
  updateProgressError: store.user.updateProgressError
});

const mapDispatchToProps = {
  getNewsList: Actions.GET_NEWS_LIST,
  getCurrentUser: Actions.GET_CURRENT_USER,
  progressUp: Actions.PROGRESS_UP,
  progressDown: Actions.PROGRESS_DOWN
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
