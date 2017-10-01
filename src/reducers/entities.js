import { combineReducers } from "redux";
import users from "./users";
import repositories from "./repositories";

export default combineReducers({ users, repositories });
