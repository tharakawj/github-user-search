import React from "react";
import styled from "styled-components";

import UserGridItem from "./UserGridItem";

const UserGridContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
`;

const UserGrid = ({ users }) => (
  <UserGridContainer>
    {users.map(user => (
      <li key={user.id}>
        <UserGridItem username={user.login} avatarUrl={user.avatar_url} />
      </li>
    ))}
  </UserGridContainer>
);

export default UserGrid;
