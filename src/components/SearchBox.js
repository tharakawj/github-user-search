import React from "react";
import styled from "styled-components";

const Input = styled.input`
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 4px;
  font-size: 26px;
  padding: 10px;
`;

const SearchBoxContrainer = styled.div`
  padding: 10px;
  margin-bottom: 30px;
`;

const SearchBox = ({ value, onChange, onSubmit }) => (
  <SearchBoxContrainer>
    <form onSubmit={onSubmit}>
      <Input
        type="text"
        name="search"
        placeholder="Search GitHub users..."
        value={value}
        onChange={onChange}
        autoComplete="off"
        autoFocus
      />
    </form>
  </SearchBoxContrainer>
);

export default SearchBox;
