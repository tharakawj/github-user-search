import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ProfileCard from "../components/ProfileCard";
import Spinner from "../components/Spinner";

import { fetchUser } from "../actions";
import { getCurrentProfile } from "../selectors/profileSelectors";
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

    if (!this.props.profile) {
      return <div>Couldn't find the profile</div>;
    }

    return <ProfileCard user={this.props.profile} />;
  }

  render() {
    return <ProfilePageContainer>{this.renderProfile()}</ProfilePageContainer>;
  }
}

function mapStateToProps(state, props) {
  return {
    login: getLogin(state, props),
    profile: getCurrentProfile(state, props),
    loading: state.profile.loading
  };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
