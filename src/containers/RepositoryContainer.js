import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Spinner from "../components/Spinner";
import Card from "../components/Card";
import { InfoTag, GithubLink } from "../components/ProfileCard";
import { fetchUserRepos } from "../actions";
import {
  getCurrentUsersRepositories,
  getCurrentUsersRepositoryLoadingStatus
} from "../selectors/profileSelectors";

const RepositoryGrid = styled.ul`
  display: block;
  width: 100%;
  list-style: none;
  padding: 0px;
`;

const RepositoryItem = styled(Card)`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 10px;
  position: relative;
`;

const Title = styled.h3`
  color: #555;
  font-weight: 400;
  font-size: 20px;
  margin: 0px;
`;

const Description = styled.p`
  color: #888;
  font-weight: 300;
  font-size: 12px;
  word-wrap: break-word;
  max-width: 450px;
  min-width: 250px;
`;

class RepositoryContainer extends Component {
  componentWillReceiveProps() {}

  componentDidMount() {
    if (this.props.login) {
      this.props.fetchUserRepos(this.props.login);
    }
  }

  render() {
    // Doesn't show anything if parent is still loading
    // But continue to fetch data in the background
    if (this.props.parentLoading) {
      return null;
    }

    if (this.props.loading) {
      return <Spinner />;
    }

    if (!this.props.repositories || this.props.repositories.length === 0) {
      return <div>No repositories found!</div>;
    }

    return (
      <div>
        <RepositoryGrid>
          {this.props.repositories.map(repo => (
            <li key={repo.id}>
              <RepositoryItem>
                <Title>{repo.name}</Title>
                <Description>{repo.description}</Description>
                <InfoTag icon="star" text={repo.stargazers_count} />
                {repo.language && <InfoTag icon="code" text={repo.language} />}
                <GithubLink href={repo.html_url} target="_blank">
                  <i className="material-icons md-18">link</i>
                </GithubLink>
              </RepositoryItem>
            </li>
          ))}
        </RepositoryGrid>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    repositories: getCurrentUsersRepositories(state, props),
    loading: getCurrentUsersRepositoryLoadingStatus(state, props)
  };
}

export default connect(mapStateToProps, { fetchUserRepos })(
  RepositoryContainer
);
