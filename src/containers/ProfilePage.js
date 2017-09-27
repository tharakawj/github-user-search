import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUser } from "../actions";
import { getCurrentProfile } from "../selectors/profileSelectors";
import { getLogin } from "../selectors/commonSelectors";

class ProfilePage extends Component {
  componentDidMount() {
    if (this.props.login) {
      this.props.fetchUser(this.props.login);
    }
  }

  render() {
    return (
      <div>
        Profile Page : {this.props.profile ? this.props.profile.name : ""}
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    login: getLogin(state, props),
    profile: getCurrentProfile(state, props)
  };
}

export default connect(mapStateToProps, { fetchUser })(ProfilePage);
