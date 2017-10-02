import React from "react";
import styled from "styled-components";

import UserGridItem from "./UserGridItem";

const UserGridContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
`;

const UserGrid = ({ users, fetchMore }) => (
  <UserGridContainer>
    {users.map(user => (
      <li key={user.id}>
        <UserGridItem
          login={user.login}
          avatarUrl={user.avatar_url}
          fetchMore={fetchMore}
        />
      </li>
    ))}
  </UserGridContainer>
);

export default UserGrid;
