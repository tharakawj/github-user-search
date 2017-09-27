import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { connect } from "react-redux";
import range from "lodash/range";

import { searchUser } from "../actions";
import SearchBox from "../components/SearchBox";
import { ITEMS_PER_PAGE } from "../constants/searchParams";

import { getSearchedUsers } from "../selectors/searchSelectors";

class SearchPage extends Component {
  state = { query: "" };

  updateQuery = props => {
    const queryParams = queryString.parse(props.location.search);
    const query = queryParams.q;
    const page = parseInt(queryParams.page || 1);

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
      <ul>
        {range(1, Math.ceil(this.props.total / 10)).map(page => (
          <li key={page}>
            {this.props.page === page ? (
              `${page}`
            ) : (
              <Link
                to={{
                  pathname: this.props.match.url,
                  search: `?q=${queryParams.q}&page=${page}`
                }}
              >
                {page}
              </Link>
            )}
            <br />
          </li>
        ))}
      </ul>
    );
  };

  renderResults = () => {
    if (this.props.loading) {
      return <div>Loading</div>;
    }

    if (this.props.result.length === 0) {
      return <div>No results found</div>;
    }

    return (
      <div>
        <ul>
          {this.props.result.map(user => (
            <li key={user.id}>
              <Link to={`/users/${user.login}`}>{user.login} </Link>
            </li>
          ))}
        </ul>
        {this.props.total > 10 && this.renderPagination()}
      </div>
    );
  };

  render() {
    return (
      <div>
        Search Page
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
