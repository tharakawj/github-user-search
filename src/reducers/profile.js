import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  error: ""
};

function profile(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_PROGRESSING:
      return {
        loading: true,
        error: ""
      };

    case types.FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        error: ""
      };

    case types.FETCH_USER_FAILED:
      return {
        loading: false,
        error: action.message
      };

    default:
      return state;
  }
}

export default profile;
