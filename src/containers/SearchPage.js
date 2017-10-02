import React, { Component } from "react";
import queryString from "query-string";
import { connect } from "react-redux";

import SearchBox from "../components/SearchBox";
import UserGrid from "../components/UserGrid";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

import { ITEMS_PER_PAGE } from "../constants/searchParams";
import { searchUser } from "../actions";
import { getSearchedUsers } from "../selectors/searchSelectors";

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

  search = query => {
    this.props.history.replace(`${this.props.match.url}?q=${this.state.query}`);
    this.props.searchUser(query, 1);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.search(this.state.query);
  };

  handleChange = e => {
    this.setState({ query: e.target.value }, () => {
      this.search(this.state.query.length > 2 ? this.state.query : "");
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

    if (this.props.result.length === 0 && !this.state.query) {
      return <div>Type something to start searching</div>;
    }

    if (this.props.result.length === 0 && this.state.query.length < 3) {
      return <div>Type few more letters to start searching</div>;
    }

    if (this.props.result.length === 0) {
      return <div>No results found</div>;
    }

    return (
      <div>
        <UserGrid
          users={this.props.result}
          fetchMore={
            /*  Make this `true` to asynchronous-ly 
                shows the number of followers and following of each user. But this leads the app to 
                exceed Github API rate limit in a short time
            */
            false
          }
        />
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
