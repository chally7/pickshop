import React, { useState } from 'react';
import '../style/SearchBox.scss';

function SearchBox() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('검색어:', query);
    
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        placeholder="상품검색"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default SearchBox;
