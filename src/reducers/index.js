import { combineReducers } from "redux";

import { authReducer as auth } from "./auth";
import { reportReducer as report } from "./report";
import { userReducer as user } from "./user";
import { adminReducer as admin } from "./admin";
import { homeworkReducer as homework } from "./homework";
import { noteReducer as note } from "./note";

const reducer = combineReducers({
  admin,
  auth,
  report,
  user,
  homework,
  note,
});

export default reducer;
