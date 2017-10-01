import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import RepositoryContainer from "./RepositoryContainer";
import FollowerContainer from "./FollowerContainer";
import FollowingContainer from "./FollowingContainer";

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

const LinkContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const activeClassName = "nav-item-active";

const CollectionLink = styled(NavLink).attrs({
  activeClassName
})`
  display: inline-block;
  color: #555;
  font-size: 15px;
  margin: 5px;
  padding-bottom: 2px;
  text-decoration: none;
  border-bottom: 2px solid #eee;

  &.${activeClassName} {
    border-bottom: 2px solid #555;
  }
`;

class ProfilePage extends Component {
  componentDidMount() {
    if (this.props.login) {
      this.props.fetchUser(this.props.login);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.login !== nextProps.login) {
      this.props.fetchUser(nextProps.login);
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
    const { login, loading, match } = this.props;
    return (
      <ProfilePageContainer>
        {this.renderProfile()}
        <LinkContainer>
          <CollectionLink to={`${match.url}`} exact>
            Repositories
          </CollectionLink>
          <CollectionLink to={`${match.url}/followers`}>
            Followers
          </CollectionLink>
          <CollectionLink to={`${match.url}/following`}>
            Following
          </CollectionLink>
        </LinkContainer>
        <Switch>
          <Route
            path={`${match.url}`}
            render={props => (
              <RepositoryContainer
                {...props}
                login={login}
                parentLoading={loading}
              />
            )}
            exact
          />
          <Route
            path={`${match.url}/followers`}
            render={props => (
              <FollowerContainer
                {...props}
                login={login}
                parentLoading={loading}
              />
            )}
          />
          <Route
            path={`${match.url}/following`}
            render={props => (
              <FollowingContainer
                {...props}
                login={login}
                parentLoading={loading}
              />
            )}
          />
          <Route render={() => <Redirect to={`${match.url}`} />} />
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
