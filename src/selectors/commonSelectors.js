export const getUsers = state => state.entities.users;

export const getUserEntities = state => state.entities.users.data;

export const getRepositoryEntities = state => state.entities.repositories.data;

export const getUserRepositories = state => state.userRepositories;

export const getUserFollowers = state => state.userFollowers;

export const getUserFollowing = state => state.userFollwing;

export const getLogin = (state, props) => {
  if (props.match && props.match.params && props.match.params.login) {
    return props.match.params.login;
  } else if (props.login) {
    return props.login;
  }
  return null;
};
