import {
  FETCH_USER_REPOS_PROGRESSING,
  FETCH_USER_REPOS_SUCCEEDED,
  FETCH_USER_REPOS_FAILED
} from "../constants/actionTypes";
import userCollections from "./userCollections";

export default userCollections([
  FETCH_USER_REPOS_PROGRESSING,
  FETCH_USER_REPOS_SUCCEEDED,
  FETCH_USER_REPOS_FAILED
]);
