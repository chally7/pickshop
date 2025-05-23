import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../img/search.png';
import '../style/Search.scss';
import { GlobelState } from '../MyContext';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // 검색 시도 여부 추가
  const [recentSearches, setRecentSearches] = useState(() => {
    // 로컬 스토리지에서 최근 검색어 불러오기
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { product, imgPath } = useContext(GlobelState);
  const navigate = useNavigate();

  // 고급 검색 함수 - 띄어쓰기, 특수문자 무시하고 세밀한 검색
  const advancedSearch = (searchText, productName) => {
    if (!searchText || !productName) return false;
    
    // 1. 띄어쓰기와 특수문자 제거
    const cleanSearch = searchText.toLowerCase().replace(/[\s\-_.()]/g, '');
    const cleanProduct = productName.toLowerCase().replace(/[\s\-_.()]/g, '');
    
    // 2. 직접 포함 검사
    if (cleanProduct.includes(cleanSearch)) return true;
    
    // 3. 각 단어별로 모두 포함되어 있는지 검사 (띄어쓰기로 분리된 키워드)
    const searchWords = searchText.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    const productWords = productName.toLowerCase();
    
    // 모든 검색 단어가 상품명에 포함되어 있는지 확인
    const allWordsMatch = searchWords.every(word => {
      const cleanWord = word.replace(/[\s\-_.()]/g, '');
      return cleanProduct.includes(cleanWord) || productWords.includes(word);
    });
    
    return allWordsMatch;
  };

  // 검색 실행 함수 (고급 검색 적용)
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setHasSearched(true); // 검색을 시도했다고 표시

    // 고급 검색 적용
    const results = product.filter(item => {
      if (!item.p_name) return false;
      return advancedSearch(searchTerm, item.p_name);
    });
    
    setSearchResults(results);

    // 최근 검색어에 추가 (중복 제거)
    const updatedSearches = [searchTerm, ...recentSearches.filter(term => term !== searchTerm)].slice(0, 10);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));

    // 디버깅용 로그
    console.log('검색어:', searchTerm);
    console.log('검색 결과:', results.length, '개');
  };

  // 엔터키로 검색
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 상품 상세 페이지로 이동
  const goToProductDetail = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  // 최근 검색어 클릭 (고급 검색 적용)
  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    setHasSearched(true); // 검색을 시도했다고 표시
    
    // 고급 검색으로 자동 실행
    const results = product.filter(item => {
      if (!item.p_name) return false;
      return advancedSearch(term, item.p_name);
    });
    setSearchResults(results);
  };

  // 최근 검색어 삭제
  const removeRecentSearch = (termToRemove) => {
    const updatedSearches = recentSearches.filter(term => term !== termToRemove);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  // 전체 삭제
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