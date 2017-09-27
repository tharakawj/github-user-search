import React from "react";

const SearchPage = ({ value, onChange, onSubmit }) => (
  <div>
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        placeholder="Search GitHub users..."
        value={value}
        onChange={onChange}
      />
    </form>
  </div>
);

export default SearchPage;
