import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";

import Home from "./home";
import Reports from "./reports";
import Profile from "./profile";
import Guest from "./guest";
import AdminNews from "./adminNews";
import Course from "../components/course";
import Homeworks from "../components/homeworks";
import Reviews from "../components/reviews";
import TA from "../components/ta";
import Syllabus from "../components/syllabus";
import Dashboard from "../components/dashboard";
import Interviews from "../components/interviews";
import InterviewPost from "../components/interviews/interviewPost";

const Routes = ({ user }) => {
  if (!user) {
    return (
      <Switch>
        <Route exact path="/" component={Guest} />
        <Route path="/invite/:token" component={Guest} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/reports" component={Reports} />
      <Route path="/profile" component={Profile} />
      <Route path="/users/:id" component={Profile} />
      <Route path="/interviews/:id" component={InterviewPost} />
      <Route path="/interviews" component={Interviews} />
      {user.isStudent && <Route path="/course" component={Course} />}
      {user.isStudent && <Route path="/homeworks" component={Homeworks} />}
      {user.isTA && <Route path="/reviews" component={Reviews} />}
      {user.isAdmin && <Route path="/admin/ta" component={TA} />}
      {user.isAdmin && <Route path="/admin/news" component={AdminNews} />}
      {user.isAdmin && <Route path="/admin/dashboard" component={Dashboard} />}
      {user.isAdmin && (
        <Route path="/admin/syllabus/:week" component={Syllabus} />
      )}
    </Switch>
  );
};

const mapStateToProps = store => ({
  user: store.auth.user
});

export default withRouter(connect(mapStateToProps)(Routes));
