import { createSelector } from "reselect";
import { denormalize } from "normalizr";
import { getEntities } from "./commonSelectors";
import user from "../schemas/user";

export const getSearchResult = state => state.search.result;

export const getSearchedUsers = createSelector(
  getEntities,
  getSearchResult,
  (entities, result) => denormalize(result, [user], entities)
);
