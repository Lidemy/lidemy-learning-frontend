import React from "react";
import { connect } from "react-redux";
import Reports from "../components/reports";
import { Actions } from "../actions";

const ReportsContainer = props => <Reports {...props} />;

const mapStateToProps = store => ({
  isLoadingCreateReport: store.report.isLoadingCreateReport,
  isLoadingGetReportList: store.report.isLoadingGetReportList,
  createReportError: store.report.createReportError,
  reportList: store.report.reportList
});

const mapDispatchToProps = {
  createReport: Actions.CREATE_REPORT,
  getReportList: Actions.GET_REPORT_LIST,
  clearReports: Actions.CLEAR_REPORT_LIST
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsContainer);
