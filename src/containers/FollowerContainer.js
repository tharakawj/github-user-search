import React, { Component } from "react";
import { connect } from "react-redux";

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
    if (this.props.loading) {
      return <Spinner />;
    }

    if (!this.props.followers || this.props.followers.length === 0) {
      return <div>"No repositories found!"</div>;
    }

    return (
      <div>
        <ul>
          {this.props.followers.map(user => (
            <li key={user.id}>{user.login}</li>
          ))}
        </ul>
      </div>
    );
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
