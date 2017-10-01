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
