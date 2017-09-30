import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import range from "lodash/range";
import styled, { css } from "styled-components";

const PaginationContainer = styled.ul`
  list-style: none;
  padding: 0px;
  width: 100%;
  font-size: 16px;
`;

const PageItem = styled.li`
  display: inline-block;
  text-align: center;
  vertical-align: middle;
`;

const PageLink = styled(Link)`
  display: inline-block;
  padding: 5px 10px;
  margin: 0px 5px;
  text-decoration: none;
  color: #555;
`;

const DeactivePageLink = styled.span`
  display: inline-block;
  padding: 5px 10px;
  margin: 0px 5px;
  border-radius: 2px;
  color: #999;

  ${props =>
    !props.disabled &&
    css`
      background: #ddd;
      color: #555;
    `};
`;

const Icon = styled.i.attrs({
  className: "material-icons"
})`
  display: inline-flex;
  vertical-align: middle;
`;

class Pagination extends Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    displayCount: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    getPathname: PropTypes.func.isRequired
  };

  renderPageLink(pageNumber, active, disabled, label = pageNumber) {
    if (active) {
      return <DeactivePageLink disabled={disabled}>{label}</DeactivePageLink>;
    } else {
      return (
        <PageLink to={this.props.getPathname(pageNumber)}>{label}</PageLink>
      );
    }
  }

  renderPrevious() {
    const prePage = this.props.currentPage - 1;
    const label = <Icon>navigate_before</Icon>;
    return this.renderPageLink(prePage, prePage < 1, true, label);
  }

  renderNext() {
    const { currentPage, pageCount } = this.props;
    const nextPage = currentPage + 1;
    const label = <Icon>navigate_next</Icon>;
    return this.renderPageLink(nextPage, nextPage > pageCount, true, label);
  }

  renderPageItems() {
    const { currentPage, pageCount, displayCount } = this.props;
    if (displayCount < pageCount) {
      return range(1, displayCount + 1).map(pageNumber =>
        this.renderPageLink(pageNumber, pageNumber === currentPage)
      );
    } else {
      return range(1, pageCount + 1).map(pageNumber =>
        this.renderPageLink(pageNumber, pageNumber === currentPage)
      );
    }
  }

  render() {
    return (
      <PaginationContainer>
        <PageItem>{this.renderPrevious()}</PageItem>
        {this.renderPageItems().map(item => (
          <PageItem key={item.props.children}>{item}</PageItem>
        ))}
        <PageItem>{this.renderNext()}</PageItem>
      </PaginationContainer>
    );
  }
}

export default Pagination;
