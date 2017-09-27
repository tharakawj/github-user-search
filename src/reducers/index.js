import { combineReducers } from "redux";
import entities from "./entities";
import search from "./search";
import profile from "./profile";

const rootReducer = combineReducers({
  entities,
  search,
  profile
});

export default rootReducer;
