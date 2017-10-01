import { combineReducers } from "redux";
import entities from "./entities";
import search from "./search";
import userRepositories from "./userRepositories";
import userFollowers from "./userFollowers";
import userFollwing from "./userFollwing";

const rootReducer = combineReducers({
  entities,
  search,
  userRepositories,
  userFollowers,
  userFollwing
});

export default rootReducer;
