import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import styled from "styled-components";

import { searchUser } from "../actions";
import SearchBox from "../components/SearchBox";
import UserCard from "../components/UserCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { ITEMS_PER_PAGE } from "../constants/searchParams";

import { getSearchedUsers } from "../selectors/searchSelectors";

const UserGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0px;
`;

class SearchPage extends Component {
  state = { query: "" };

  updateQuery = props => {
    const queryParams = queryString.parse(props.location.search);
    const query = queryParams.q;
    const page = parseInt(queryParams.page || 1, 10);

    if (query && (query !== this.state.query || page !== this.props.page)) {
      this.setState({ query: queryParams.q }, () => {
        props.searchUser(this.state.query, page);
      });
    }
  };

  search = () => {
    this.props.history.replace(`${this.props.match.url}?q=${this.state.query}`);
    this.props.searchUser(this.state.query, 1);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.search();
  };

  handleChange = e => {
    this.setState({ query: e.target.value }, () => {
      if (this.state.query.length > 2) {
        this.search();
      }
    });
  };

  componentDidMount() {
    this.updateQuery(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.updateQuery(nextProps);
    }
  }

  renderPagination = () => {
    const queryParams = queryString.parse(this.props.location.search);
    return (
      <Pagination
        pageCount={Math.ceil(this.props.total / ITEMS_PER_PAGE)}
        displayCount={10}
        currentPage={this.props.page}
        getPathname={page => {
          return {
            pathname: this.props.match.url,
            search: `?q=${queryParams.q}&page=${page}`
          };
        }}
      />
    );
  };

  renderResults = () => {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.result.length === 0) {
      return <div>No results found</div>;
    }

    return (
      <div>
        <UserGrid>
          {this.props.result.map(user => (
            <UserCard
              key={user.id}
              username={user.login}
              avatarUrl={user.avatar_url}
            />
          ))}
        </UserGrid>
        {this.props.total > ITEMS_PER_PAGE && this.renderPagination()}
      </div>
    );
  };

  render() {
    return (
      <div>
        <SearchBox
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          value={this.state.query}
        />
        <div>{this.renderResults()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    page: state.search.page,
    result: getSearchedUsers(state),
    total: state.search.total,
    error: state.search.error,
    loading: state.search.loading
  };
}

export default connect(mapStateToProps, { searchUser })(SearchPage);
