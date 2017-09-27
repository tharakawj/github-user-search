import { createSelector } from "reselect";

import { getEntities, getLogin } from "./commonSelectors";

export const getCurrentProfile = createSelector(
  getEntities,
  getLogin,
  (entities, login) => (login in entities.users ? entities.users[login] : null)
);
