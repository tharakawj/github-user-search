import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.li`
  min-width: 212px;
  display: inline-block;
  background: #fff;
  box-shadow: 0 1px 4px rgba(1, 1, 1, 0.15);
  margin: 10px;
  padding: 5px;
  border-radius: 2px;
`;

const CardLeft = styled.div`
  display: table-cell;
  vertical-align: top;
  line-height: 0;
  padding-right: 10px;
`;

const CardRight = styled.div`
  display: table-cell;
  vertical-align: top;
  padding-top: 10px;
  max-width: 150px;
  text-overflow: ellipsis;
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

const UserCard = ({ username, avatarUrl }) => (
  <Link to={`/users/${username}`}>
    <Card>
      <CardLeft>
        <Avatar src={avatarUrl} />
      </CardLeft>
      <CardRight>
        <Title>{username}</Title>
      </CardRight>
    </Card>
  </Link>
);

export default UserCard;
