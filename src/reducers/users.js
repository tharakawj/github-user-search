import update from "immutability-helper";
import mapValues from "lodash/mapValues";
import merge from "lodash/merge";

import * as types from "../constants/actionTypes";

const initialState = {
  data: {},
  fetchStatus: {},
  errors: {}
};

function users(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_USER_SUCCEEDED:
      return update(state, {
        data: {
          $set: merge({}, state.data, action.entities.users)
        },
        fetchStatus: {
          $set: {
            ...mapValues(action.entities.users, () => ({
              complete: false,
              loading: false
            })),
            ...state.fetchStatus
          }
        }
      });

    case types.FETCH_USER_PROGRESSING:
      return update(state, {
        fetchStatus: {
          $merge: { [action.login]: { loading: true } }
        }
      });

    case types.FETCH_USER_SUCCEEDED:
      return update(state, {
        data: {
          $set: merge({}, state.data, action.entities.users)
        },
        fetchStatus: {
          $merge: { [action.login]: { loading: false, complete: true } }
        }
      });

    case types.FETCH_USER_FAILED:
      return update(state, {
        fetchStatus: {
          [action.login]: { $merge: { loading: false, complete: false } }
        },
        errors: {
          [action.login]: { $set: action.message }
        }
      });

    default:
      return state;
  }
}

export default users;
