import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../components/Spinner";
import { fetchUserFollowing } from "../actions";
import {
  getCurrentUsersFollowing,
  getCurrentUsersFollowingLoadingStatus
} from "../selectors/profileSelectors";

class FollowingContainer extends Component {
  componentWillReceiveProps() {}

  componentDidMount() {
    if (this.props.login) {
      this.props.fetchUserFollowing(this.props.login);
    }
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (!this.props.following || this.props.following.length === 0) {
      return <div>"No repositories found!"</div>;
    }

    return (
      <div>
        <ul>
          {this.props.following.map(user => (
            <li key={user.id}>{user.login}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    following: getCurrentUsersFollowing(state, props),
    loading: getCurrentUsersFollowingLoadingStatus(state, props)
  };
}

export default connect(mapStateToProps, { fetchUserFollowing })(
  FollowingContainer
);
