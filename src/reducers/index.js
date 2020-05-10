import { combineReducers } from "redux";

import { authReducer as auth } from "./auth";
import { reportReducer as report } from "./report";
import { userReducer as user } from "./user";
import { adminReducer as admin } from "./admin";
import { homeworkReducer as homework } from "./homework";

const reducer = combineReducers({
  admin,
  auth,
  report,
  user,
  homework
});

export default reducer;
