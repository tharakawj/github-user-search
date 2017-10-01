import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import ProfileCard from "../components/ProfileCard";
import Spinner from "../components/Spinner";

import { fetchUser } from "../actions";
import {
  getCurrentUser,
  getCurrentUserLoadingStatus,
  getCurrentUserErrorStatus
} from "../selectors/profileSelectors";
import { getLogin } from "../selectors/commonSelectors";

const ProfilePageContainer = styled.div``;

class ProfilePage extends Component {
  componentDidMount() {
    if (this.props.login) {
      this.props.fetchUser(this.props.login);
    }
  }

  renderProfile() {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (!this.props.user) {
      return <div>Couldn't find the profile</div>;
    }

    return <ProfileCard user={this.props.user} />;
  }

  render() {
    return (
      <ProfilePageContainer>
        {this.renderProfile()}
        <div>
          <Link to={`${this.props.match.url}`}>Repositories</Link>
          <Link to={`${this.props.match.url}/followers`}>Followers</Link>
          <Link to={`${this.props.match.url}/following`}>Following</Link>
        </div>
        <Switch>
          <Route
            path={`${this.props.match.url}`}
            render={() => <span>Repositories</span>}
            exact
          />
          <Route
            path={`${this.props.match.url}/followers`}
            render={() => <span>Followers</span>}
          />
          <Route
            path={`${this.props.match.url}/following`}
            render={() => <span>Following</span>}
          />

          <Route render={() => <Redirect to={`${this.props.match.url}`} />} />
        </Switch>
      </ProfilePageContainer>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    login: getLogin(state, props),
    user: getCurrentUser(state, props),
    loading: getCurrentUserLoadingStatus(state, props),
    error: getCurrentUserErrorStatus(state, props)
  };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
