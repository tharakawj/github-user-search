import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import { fetchUserRepos } from "../actions";
import {
  getCurrentUsersRepositories,
  getCurrentUsersRepositoryLoadingStatus
} from "../selectors/profileSelectors";

class RepositoryContainer extends Component {
  componentWillReceiveProps() {}

  componentDidMount() {
    if (this.props.login) {
      this.props.fetchUserRepos(this.props.login);
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (!this.props.repositories || this.props.repositories.length === 0) {
      return <div>"No repositories found!"</div>;
    }

    return (
      <div>
        <ul>
          {this.props.repositories.map(repo => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    repositories: getCurrentUsersRepositories(state, props),
    loading: getCurrentUsersRepositoryLoadingStatus(state, props)
  };
}

export default connect(mapStateToProps, { fetchUserRepos })(
  RepositoryContainer
);
