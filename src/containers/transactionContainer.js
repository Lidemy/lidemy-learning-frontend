import React from "react";
import { connect } from "react-redux";
import TransactionBlock from "../components/profile/transactionBlock";

const TransactionContainer = props => <TransactionBlock {...props} />;

const mapStateToProps = store => ({
  user: store.auth.user
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionContainer);
