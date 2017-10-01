const initialState = {};

function userCollections(types) {
  const [progressingType, succeededType, failedType] = types;

  return function userCollectionsReducer(state = initialState, action) {
    switch (action.type) {
      case progressingType:
        return {
          ...state,
          [action.login]: {
            ...state[action.login],
            loading: true
          }
        };

      case succeededType:
        return {
          ...state,
          [action.login]: {
            ...state[action.login],
            loading: false,
            data: action.result
          }
        };

      case failedType:
        return {
          ...state,
          [action.login]: {
            ...state[action.login],
            loading: false,
            error: action.message
          }
        };

      default:
        return state;
    }
  };
}

export default userCollections;
