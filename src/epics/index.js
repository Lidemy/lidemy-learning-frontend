import { combineEpics } from "redux-observable";
import { keysIn } from "lodash";
import * as authEpics from "./authEpics";
import * as adminEpics from "./adminEpics";
import * as userEpics from "./userEpics";
import * as reportEpics from "./reportEpics";

const combineEpicFunctions = epics => {
  return epics.reduce((arr, epic) => {
    return arr.concat(keysIn(epic).map(key => epic[key]));
  }, []);
};

const epics = combineEpicFunctions([
  authEpics,
  adminEpics,
  userEpics,
  reportEpics
]);

export const rootEpic = combineEpics(...epics);
