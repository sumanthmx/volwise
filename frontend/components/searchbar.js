import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default SearchBar;

/* use this in the file when utilizing searchbar
const handleSearch = (query) => {
    // Handle the search action with the query value
    console.log('Searching for:', query);
  };
 */