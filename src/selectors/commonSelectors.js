export const getEntities = state => state.entities;

export const getLogin = (state, props) => {
  if (props.match && props.match.params && props.match.params.login) {
    return props.match.params.login;
  }
  return null;
};
