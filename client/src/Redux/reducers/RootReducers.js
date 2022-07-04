import { combineReducers } from "redux";

import authReducer from "./authReducer";
import todoReducer from "./todoReducer";

const rooterReducers = combineReducers({
  auth: authReducer,
  todo: todoReducer,
});

export default rooterReducers;
