export const getUsers = state => state.entities.users;

export const getUserEntities = state => state.entities.users.data;

export const getLogin = (state, props) => {
  if (props.match && props.match.params && props.match.params.login) {
    return props.match.params.login;
  }
  return null;
};
