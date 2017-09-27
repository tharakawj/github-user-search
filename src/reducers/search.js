import * as types from "../constants/actionTypes";

const initialState = {
  page: 1,
  result: [],
  total: 0,
  error: "",
  loading: false
};

function search(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_USER_REQUEST:
      return {
        ...state,
        page: action.page
      };

    case types.SEARCH_USER_PROGRESSING:
      return {
        ...state,
        loading: true
      };

    case types.SEARCH_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        result: action.result,
        total: action.total_count
      };

    case types.SEARCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        result: [],
        total: 0,
        error: action.message
      };

    default:
      return state;
  }
}

export default search;
