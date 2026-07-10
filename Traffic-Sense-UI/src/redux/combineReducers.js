import { combineReducers } from "redux";

import userReducer from "./users/reducer";

const reducers = combineReducers({
  userReducer,
});

export default reducers;
