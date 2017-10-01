import {
  SEARCH_USER_REQUEST,
  FETCH_USER_REQUEST,
  FETCH_USER_REPOS_REQUEST,
  FETCH_USER_FOLLOWERS_REQUEST,
  FETCH_USER_FOLLOWING_REQUEST
} from "../constants/actionTypes";

const searchUser = (query, page) => {
  return {
    type: SEARCH_USER_REQUEST,
    query,
    page
  };
};

const shouldFetchUser = (login, state) => {
  const { entities } = state;
  const { users } = entities;
  const userExists = login in users.data && login in users.fetchStatus;
  const completeUser = userExists ? users.fetchStatus[login].complete : false;
  return !userExists || !completeUser;
};

const fetchUser = login => (dispatch, getState) => {
  if (shouldFetchUser(login, getState())) {
    dispatch({
      type: FETCH_USER_REQUEST,
      login
    });
  }
};

const shouldFetchUserRepos = (login, state) => {
  const { userRepositories } = state;
  return !userRepositories[login] || !userRepositories[login].data;
};

const fetchUserRepos = login => (dispatch, getState) => {
  if (shouldFetchUserRepos(login, getState())) {
    dispatch({
      type: FETCH_USER_REPOS_REQUEST,
      login
    });
  }
};

const shouldFetchUserFollowers = (login, state) => {
  const { userFollowers } = state;
  return !userFollowers[login] || !userFollowers[login].data;
};

const fetchUserFollowers = login => (dispatch, getState) => {
  if (shouldFetchUserFollowers(login, getState())) {
    dispatch({
      type: FETCH_USER_FOLLOWERS_REQUEST,
      login
    });
  }
};

const shouldFetchUserFollowing = (login, state) => {
  const { userFollwing } = state;
  return !userFollwing[login] || !userFollwing[login].data;
};

const fetchUserFollowing = login => (dispatch, getState) => {
  if (shouldFetchUserFollowing(login, getState())) {
    dispatch({
      type: FETCH_USER_FOLLOWING_REQUEST,
      login
    });
  }
};

export {
  searchUser,
  fetchUser,
  fetchUserRepos,
  fetchUserFollowers,
  fetchUserFollowing
};
