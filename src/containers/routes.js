import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from "./home";
import Reports from "./reports";
import Profile from "./profile";
import Guest from "./guest";
import AdminNews from "./adminNews";

const Routes = ({ user }) => {
  if (!user) {
    return <Guest />;
  }
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/reports" component={Reports} />
      <Route path="/profile" component={Profile} />
      <Route path="/users/:id" component={Profile} />
      {user.isAdmin && <Route path="/admin/news" component={AdminNews} />}
    </Switch>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user
});

export default withRouter(connect(mapStateToProps)(Routes));
