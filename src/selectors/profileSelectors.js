import { createSelector } from "reselect";
import { denormalize } from "normalizr";

import { repository, user } from "../schemas";

import {
  getUsers,
  getLogin,
  getUserEntities,
  getRepositoryEntities,
  getUserRepositories,
  getUserFollowers,
  getUserFollowing
} from "./commonSelectors";

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

// User Repositories

const getCurrentUserRepository = createSelector(
  getUserRepositories,
  getLogin,
  function(userRepositories, login) {
    return userRepositories[login];
  }
);

export const getCurrentUsersRepositories = createSelector(
  getUserEntities,
  getRepositoryEntities,
  getCurrentUserRepository,
  function(users, repositories, userRepository) {
    if (userRepository && userRepository.data) {
      const denormalizedRepositories = denormalize(
        userRepository.data,
        [repository],
        {
          repositories,
          users
        }
      );
      return denormalizedRepositories;
    }
    return null;
  }
);

export const getCurrentUsersRepositoryLoadingStatus = createSelector(
  getCurrentUserRepository,
  function(userRepository) {
    if (userRepository) {
      return userRepository.loading;
    }
    return false;
  }
);

// User Followers

const getCurrentUserFollower = createSelector(
  getUserFollowers,
  getLogin,
  function(userFollowers, login) {
    return userFollowers[login];
  }
);

export const getCurrentUsersFollowers = createSelector(
  getUserEntities,
  getCurrentUserFollower,
  function(users, userFollower) {
    if (userFollower && userFollower.data) {
      const denormalizedRepositories = denormalize(userFollower.data, [user], {
        users
      });
      return denormalizedRepositories;
    }
    return null;
  }
);

export const getCurrentUsersFollowersLoadingStatus = createSelector(
  getCurrentUserFollower,
  function(userFollower) {
    if (userFollower) {
      return userFollower.loading;
    }
    return false;
  }
);

// User Following

const getCurrentUserFollowing = createSelector(
  getUserFollowing,
  getLogin,
  function(userFollwing, login) {
    return userFollwing[login];
  }
);

export const getCurrentUsersFollowing = createSelector(
  getUserEntities,
  getCurrentUserFollowing,
  function(users, userFollwing) {
    if (userFollwing && userFollwing.data) {
      const denormalizedRepositories = denormalize(userFollwing.data, [user], {
        users
      });
      return denormalizedRepositories;
    }
    return null;
  }
);

export const getCurrentUsersFollowingLoadingStatus = createSelector(
  getCurrentUserFollowing,
  function(userFollwing) {
    if (userFollwing) {
      return userFollwing.loading;
    }
    return false;
  }
);
