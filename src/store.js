import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { createLogger } from "redux-logger";

import reducers from "./reducers";
import { rootEpic } from "./epics";
import authListener from "./middlewares/authListener";

const isProduction = process.env.NODE_ENV === "production";

const logger = createLogger({
  collapsed: true,
});

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  reducers,
  isProduction
    ? applyMiddleware(authListener, epicMiddleware)
    : applyMiddleware(logger, authListener, epicMiddleware)
);

epicMiddleware.run(rootEpic);

export default store;
