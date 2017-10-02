import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import { getUserEntities } from "./commonSelectors";
import { user } from "../schemas";

export const getSearchResult = state => state.search.result;

export const getSearchedUsers = createSelector(
  getUserEntities,
  getSearchResult,
  (users, result) => denormalize(result, [user], { users })
);

export const getFollowersCount = (state, props) => {
  if (props.login && state.entities.users.data[props.login]) {
    return state.entities.users.data[props.login].followers;
  }
  return 0;
};

export const getFollowingCount = (state, props) => {
  if (props.login && state.entities.users.data[props.login]) {
    return state.entities.users.data[props.login].following;
  }
  return 0;
};

export const getCompleteState = (state, props) => {
  if (props.login && state.entities.users.fetchStatus[props.login]) {
    return state.entities.users.fetchStatus[props.login].complete;
  }
  return false;
};
