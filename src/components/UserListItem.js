import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Card from "./Card";

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
`;

const UserListItem = ({ username, avatarUrl }) => (
  <Link to={`/users/${username}`}>
    <Item>
      <ItemLeft>
        <Avatar src={avatarUrl} />
      </ItemLeft>
      <ItemRight>
        <Title>{username}</Title>
      </ItemRight>
    </Item>
  </Link>
);

export default UserListItem;
