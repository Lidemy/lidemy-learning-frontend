import React from "react";
import { connect } from "react-redux";
import AdminNews from "../components/adminNews";
import { Actions } from "../actions";

const AdminNewsContainer = props => <AdminNews {...props} />;

const mapStateToProps = store => ({
  isLoadingCreateNews: store.admin.isLoadingCreateNews,
  isLoadingDeleteNews: store.admin.isLoadingDeleteNews,
  isLoadingGetNews: store.admin.isLoadingGetNews,
  isLoadingGetNewsList: store.admin.isLoadingGetNewsList,
  isLoadingUpdateNews: store.admin.isLoadingUpdateNews,
  news: store.admin.news,
  newsList: store.admin.newsList,
  updateNewsError: store.admin.updateNewsError,
  createNewsError: store.admin.createNewsError
});

const mapDispatchToProps = {
  getNewsList: Actions.GET_NEWS_LIST,
  getNews: Actions.GET_NEWS,
  createNews: Actions.CREATE_NEWS,
  updateNews: Actions.UPDATE_NEWS,
  deleteNews: Actions.DELETE_NEWS
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminNewsContainer);
