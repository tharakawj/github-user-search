import update from "immutability-helper";
import merge from "lodash/merge";

import * as types from "../constants/actionTypes";

const initialState = {
  data: {}
};

function repositories(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_REPOS_SUCCEEDED:
      return update(state, {
        data: {
          $set: merge({}, state.data, action.entities.repositories)
        }
      });

    default:
      return state;
  }
}

export default repositories;
