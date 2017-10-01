import { call, put, all, takeLatest } from "redux-saga/effects";
import { normalize } from "normalizr";

import request from "../utils/request";
import {
  SEARCH_USER_REQUEST,
  SEARCH_USER_PROGRESSING,
  SEARCH_USER_SUCCEEDED,
  SEARCH_USER_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_PROGRESSING,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED
} from "../constants/actionTypes";
import { ITEMS_PER_PAGE } from "../constants/searchParams";
import user from "../schemas/user";

function* searchUser(action) {
  yield put({ type: SEARCH_USER_PROGRESSING });
  const url = `search/users?q=${action.query}&page=${action.page}&per_page=${ITEMS_PER_PAGE}`;

  try {
    const result = yield call(request, url);
    const { items, total_count } = result;
    const normalized = normalize(items, [user]);
    yield put({ type: SEARCH_USER_SUCCEEDED, ...normalized, total_count });
  } catch (e) {
    yield put({ type: SEARCH_USER_FAILED, message: e.message });
  }
}

function* fetchUser(action) {
  const login = action.login;
  yield put({ type: FETCH_USER_PROGRESSING, login });
  const url = `users/${login}`;

  try {
    const result = yield call(request, url);
    const normalized = normalize(result, user);
    yield put({ type: FETCH_USER_SUCCEEDED, ...normalized, login });
  } catch (e) {
    yield put({ type: FETCH_USER_FAILED, message: e.message, login });
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(SEARCH_USER_REQUEST, searchUser),
    takeLatest(FETCH_USER_REQUEST, fetchUser)
  ]);
}
