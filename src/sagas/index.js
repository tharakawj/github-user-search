import { call, put, all, takeLatest } from "redux-saga/effects";
import { normalize } from "normalizr";

import request from "../utils/request";
import * as types from "../constants/actionTypes";
import { ITEMS_PER_PAGE } from "../constants/searchParams";
import { user, repository } from "../schemas";

function* searchUser(action) {
  yield put({ type: types.SEARCH_USER_PROGRESSING });
  const url = `search/users?q=${action.query}&page=${action.page}&per_page=${ITEMS_PER_PAGE}`;

  try {
    const result = yield call(request, url);
    const { items, total_count } = result;
    const normalized = normalize(items, [user]);
    yield put({
      type: types.SEARCH_USER_SUCCEEDED,
      ...normalized,
      total_count
    });
  } catch (e) {
    yield put({ type: types.SEARCH_USER_FAILED, message: e.message });
  }
}

function* fetchUser(action) {
  const login = action.login;
  const url = `users/${login}`;
  yield put({ type: types.FETCH_USER_PROGRESSING, login });

  try {
    const result = yield call(request, url);
    const normalized = normalize(result, user);
    yield put({ type: types.FETCH_USER_SUCCEEDED, ...normalized, login });
  } catch (e) {
    yield put({ type: types.FETCH_USER_FAILED, message: e.message, login });
  }
}

function* fetchUserRepos(action) {
  const { login } = action;
  const url = `users/${login}/repos`;
  yield put({ type: types.FETCH_USER_REPOS_PROGRESSING, login });

  try {
    const result = yield call(request, url);
    const normalized = normalize(result, [repository]);
    yield put({ type: types.FETCH_USER_REPOS_SUCCEEDED, ...normalized, login });
  } catch (e) {
    yield put({
      type: types.FETCH_USER_REPOS_FAILED,
      message: e.message,
      login
    });
  }
}

function* fetchUserFollowers(action) {
  const { login } = action;
  const url = `users/${login}/followers?per_page=100`;
  yield put({ type: types.FETCH_USER_FOLLOWERS_PROGRESSING, login });

  try {
    const result = yield call(request, url);
    const normalized = normalize(result, [user]);
    yield put({
      type: types.FETCH_USER_FOLLOWERS_SUCCEEDED,
      ...normalized,
      login
    });
  } catch (e) {
    yield put({
      type: types.FETCH_USER_FOLLOWERS_FAILED,
      message: e.message,
      login
    });
  }
}

function* fetchUserFollowing(action) {
  const { login } = action;
  const url = `users/${login}/following?per_page=100`;
  yield put({ type: types.FETCH_USER_FOLLOWING_PROGRESSING, login });

  try {
    const result = yield call(request, url);
    const normalized = normalize(result, [user]);
    yield put({
      type: types.FETCH_USER_FOLLOWING_SUCCEEDED,
      ...normalized,
      login
    });
  } catch (e) {
    yield put({
      type: types.FETCH_USER_FOLLOWING_FAILED,
      message: e.message,
      login
    });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.SEARCH_USER_REQUEST, searchUser),
    takeLatest(types.FETCH_USER_REQUEST, fetchUser),
    takeLatest(types.FETCH_USER_REPOS_REQUEST, fetchUserRepos),
    takeLatest(types.FETCH_USER_FOLLOWERS_REQUEST, fetchUserFollowers),
    takeLatest(types.FETCH_USER_FOLLOWING_REQUEST, fetchUserFollowing)
  ]);
}
