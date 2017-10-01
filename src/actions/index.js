import {
  SEARCH_USER_REQUEST,
  FETCH_USER_REQUEST
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

export { searchUser, fetchUser };
