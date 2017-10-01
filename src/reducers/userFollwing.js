import {
  FETCH_USER_FOLLOWING_PROGRESSING,
  FETCH_USER_FOLLOWING_SUCCEEDED,
  FETCH_USER_FOLLOWING_FAILED
} from "../constants/actionTypes";
import userCollections from "./userCollections";

export default userCollections([
  FETCH_USER_FOLLOWING_PROGRESSING,
  FETCH_USER_FOLLOWING_SUCCEEDED,
  FETCH_USER_FOLLOWING_FAILED
]);
