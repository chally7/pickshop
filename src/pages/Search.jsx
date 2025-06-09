import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../img/search.png';
import '../style/Search.scss';
import { GlobelState } from '../MyContext';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { product, imgPath } = useContext(GlobelState);
  const navigate = useNavigate();

  const advancedSearch = (searchText, productName) => {
    if (!searchText || !productName) return false;
    
    const cleanSearch = searchText.toLowerCase().replace(/[\s\-_.()]/g, '');
    const cleanProduct = productName.toLowerCase().replace(/[\s\-_.()]/g, '');
    
    if (cleanProduct.includes(cleanSearch)) return true;
    
    const searchWords = searchText.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const productWords = productName.toLowerCase();
    
    const allWordsMatch = searchWords.every(word => {
      const cleanWord = word.replace(/[\s\-_.()]/g, '');
      return cleanProduct.includes(cleanWord) || productWords.includes(word);
    });
    
    return allWordsMatch;
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setHasSearched(true);

    const results = product.filter(item => {
      if (!item.p_name) return false;
      return advancedSearch(searchTerm, item.p_name);
    });
    
    setSearchResults(results);

    const updatedSearches = [searchTerm, ...recentSearches.filter(term => term !== searchTerm)].slice(0, 10);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    console.log('검색어:', searchTerm);
    console.log('검색 결과:', results.length, '개');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const goToProductDetail = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    setHasSearched(true);
    
    const results = product.filter(item => {
      if (!item.p_name) return false;
      return advancedSearch(term, item.p_name);
    });
    setSearchResults(results);
  };

  const removeRecentSearch = (termToRemove) => {
    const updatedSearches = recentSearches.filter(term => term !== termToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
    setSearchResults([]);
    setSearchTerm('');
    setHasSearched(false);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="search-page">
      <div className="search-wrapper">
        <div className="search-input-container">
          <input
            type="search"
            className="search-input"
            placeholder="상품 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src={searchIcon} alt="검색" />
          </button>
        </div>
      </div>

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <section className="search-results">
          <h2>검색 결과 ({searchResults.length}개)</h2>
          <div className="results-grid">
            {searchResults.map(item => (
              <div 
                key={item.id} 
                className="result-item"
                onClick={() => goToProductDetail(item.id)}
              >
                <img 
                  src={imgPath + item.p_thumb} 
                  alt={item.p_name}
                  className="result-image"
                />
                <div className="result-info">
                  <h3 className="result-name">{item.p_name}</h3>
                  <p className="result-price">
                    {item.p_price ? `${parseInt(item.p_price).toLocaleString()}원` : '가격 문의'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 검색했지만 결과가 없는 경우 */}
      {hasSearched && searchResults.length === 0 && (
        <section className="no-results">
          <h2>'{searchTerm}' 검색 결과가 없습니다.</h2>
          <p>다른 검색어를 시도해보세요.</p>
        </section>
      )}
           
      <section className="recent-search">
        <h2>최근 검색어</h2>
        {recentSearches.length > 0 ? (
          <div className="recent-list">
            {recentSearches.map((term, index) => (
              <div key={index} className="recent-item">
                <span 
                  className="recent-term"
                  onClick={() => handleRecentSearchClick(term)}
                >
                  {term}
                </span>
                <button 
                  className="remove-btn"
                  onClick={() => removeRecentSearch(term)}
                >
                  ×
                </button>
              </div>
            ))}
            <button 
              className="clear-all-btn"
              onClick={clearAllSearches}
            >
              전체 삭제
            </button>
          </div>
        ) : (
          <p>검색 내역이 없습니다.</p>
        )}
      </section>
    </div>
  );
}

export default Search;