import React from "react";
import styled from "styled-components";

import Card from "./Card";

const ProfileCardContainer = styled(Card)`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  padding-right: 60px;
  min-width: 250px;
`;

const ItemLeft = styled.div`
  display: inline-block;
  vertical-align: top;
  line-height: 0;
  padding-right: 20px;
`;

const ItemRight = styled.div`
  display: inline-block;
  vertical-align: top;
  padding-top: 10px;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 2px;
`;

const Title = styled.h3`
  color: #555;
  font-weight: 400;
  font-size: 24px;
  margin: 0px;
`;

const SubTitle = styled.h4`
  color: #888;
  font-weight: 300;
  font-size: 24px;
  margin: 0px;
`;

const Bio = styled.p`
  color: #888;
  font-weight: 300;
  font-size: 14px;
  word-wrap: break-word;
  max-width: 450px;
  min-width: 250px;
`;

const Icon = styled.i.attrs({
  className: "material-icons md-18"
})`
  display: inline-flex;
  vertical-align: middle;
`;

const InfoTagContainer = styled.div`
  display: inline-block;
  color: #555;
  margin-right: 20px;
  margin-bottom: 5px;
`;

const InfoTagText = styled.span`
  margin-left: 3px;
  font-size: 12px;
`;

const InfoTag = ({ icon, text }) => (
  <InfoTagContainer>
    <Icon>{icon}</Icon>
    <InfoTagText>{text}</InfoTagText>
  </InfoTagContainer>
);

const GithubLink = styled.a`
  color: #888;
  position: absolute;
  right: 20px;
  top: 20px;
`;

const ProfileCard = ({ user }) => (
  <ProfileCardContainer>
    <ItemLeft>
      <Avatar src={user.avatar_url} />
    </ItemLeft>
    <ItemRight>
      <Title>{user.name}</Title>
      <SubTitle>{user.login}</SubTitle>
      <Bio>{user.bio}</Bio>
      {user.company && <InfoTag icon="people" text={user.company} />}
      {user.location && <InfoTag icon="location_on" text={user.location} />}
      {user.blog && <InfoTag icon="public" text={user.blog} />}
    </ItemRight>
    <GithubLink href={`https://github.com/${user.login}`} target="_blank">
      <i className="material-icons">link</i>
    </GithubLink>
  </ProfileCardContainer>
);

export default ProfileCard;
