import React, { Component } from "react";
import { connect } from "react-redux";

import UserGrid from "../components/UserGrid";
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
    // Doesn't show anything if parent is still loading
    // But continue to fetch data in the background
    if (this.props.parentLoading) {
      return null;
    }

    if (this.props.loading) {
      return <Spinner />;
    }

    if (!this.props.following || this.props.following.length === 0) {
      return <div>No following found!</div>;
    }

    return <UserGrid users={this.props.following} />;
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
