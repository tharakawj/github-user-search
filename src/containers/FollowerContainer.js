import React, { Component } from "react";
import { connect } from "react-redux";

import UserGrid from "../components/UserGrid";
import Spinner from "../components/Spinner";

import { fetchUserFollowers } from "../actions";
import {
  getCurrentUsersFollowers,
  getCurrentUsersFollowersLoadingStatus
} from "../selectors/profileSelectors";

class FollowerContainer extends Component {
  componentWillReceiveProps() {}

  componentDidMount() {
    if (this.props.login) {
      this.props.fetchUserFollowers(this.props.login);
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

    if (!this.props.followers || this.props.followers.length === 0) {
      return <div>No follower found!</div>;
    }

    return <UserGrid users={this.props.followers} />;
  }
}

function mapStateToProps(state, props) {
  return {
    followers: getCurrentUsersFollowers(state, props),
    loading: getCurrentUsersFollowersLoadingStatus(state, props)
  };
}

export default connect(mapStateToProps, { fetchUserFollowers })(
  FollowerContainer
);
