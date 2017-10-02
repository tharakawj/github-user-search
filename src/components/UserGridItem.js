import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

import Card from "./Card";
import { InfoTag } from "./ProfileCard";

import { fetchUser } from "../actions";
import {
  getFollowersCount,
  getFollowingCount,
  getCompleteState
} from "../selectors/searchSelectors";

const Item = styled(Card)`
  min-width: 212px;
  margin: 10px;
`;

const ItemLeft = styled.div`
  display: table-cell;
  vertical-align: top;
  line-height: 0;
  padding-right: 10px;
`;

const ItemRight = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-top: 10px;
  max-width: 150px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 2px;
`;

const Title = styled.div`
  color: #555;
  font-weight: 500;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`;

class UserGridItem extends Component {
  componentDidMount() {
    if (this.props.login && this.props.fetchMore) {
      this.props.fetchUser(this.props.login);
    }
  }

  render() {
    const {
      login,
      avatarUrl,
      following,
      followers,
      fetchMore,
      complete
    } = this.props;
    return (
      <Link to={`/users/${login}`}>
        <Item>
          <ItemLeft>
            <Avatar src={avatarUrl} />
          </ItemLeft>
          <ItemRight>
            <Title>{login}</Title>
            {fetchMore &&
            complete && (
              <span>
                <InfoTag icon="people" text={following} />
                <InfoTag icon="people_outline" text={followers} />
              </span>
            )}
          </ItemRight>
        </Item>
      </Link>
    );
  }
}

function mapStateToProps(state, props) {
  if (!props.fetchMore) {
    return {
      following: 0,
      followers: 0,
      complete: false
    };
  }
  return {
    following: getFollowersCount(state, props),
    followers: getFollowingCount(state, props),
    complete: getCompleteState(state, props)
  };
}

export default connect(mapStateToProps, { fetchUser })(UserGridItem);
