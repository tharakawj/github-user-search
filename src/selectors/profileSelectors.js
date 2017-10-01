import { createSelector } from "reselect";

import { getUsers, getLogin } from "./commonSelectors";

export const getCurrentUser = createSelector(
  getUsers,
  getLogin,
  (users, login) => users.data[login]
);

export const getCurrentUserLoadingStatus = createSelector(
  getUsers,
  getLogin,
  (users, login) =>
    login in users.fetchStatus ? users.fetchStatus[login].loading : false
);

export const getCurrentUserErrorStatus = createSelector(
  getUsers,
  getLogin,
  (users, login) => users.errors[login]
);
