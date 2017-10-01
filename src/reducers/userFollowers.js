import {
  FETCH_USER_FOLLOWERS_PROGRESSING,
  FETCH_USER_FOLLOWERS_SUCCEEDED,
  FETCH_USER_FOLLOWERS_FAILED
} from "../constants/actionTypes";
import userCollections from "./userCollections";

export default userCollections([
  FETCH_USER_FOLLOWERS_PROGRESSING,
  FETCH_USER_FOLLOWERS_SUCCEEDED,
  FETCH_USER_FOLLOWERS_FAILED
]);
