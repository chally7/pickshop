import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import searchIcon from '../img/search.png';
import { GlobelState } from '../MyContext';
import '../style/SearchResult.scss';

function SearchResult() {
  const { product, imgPath } = useContext(GlobelState);
  const [searchTerm, setSearchTerm] = useState('휴대폰 거치대');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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

    setHasSearched(true);

    // 고급 검색 적용
    const results = product.filter(item => {
      if (!item.p_name) return false;
      return advancedSearch(searchTerm, item.p_name);
    });
    
    setSearchResults(results);

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

  // 표시할 상품 결정 (검색했으면 검색결과, 아니면 전체 상품 처음 5개)
  const displayProducts = hasSearched && searchResults.length > 0 
    ? searchResults 
    : hasSearched && searchResults.length === 0 
    ? [] 
    : product.slice(0, 5);

  if (!product.length) return <div>상품을 불러오는 중...</div>;

  return (
    <div className="searchresult">
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

      <div className="search-list">
        {/* 검색 결과 헤더 */}
        {hasSearched && (
          <div className="search-header">
            <h2>
              {searchResults.length > 0 
                ? `'${searchTerm}' 검색 결과 (${searchResults.length}개)`
                : `'${searchTerm}' 검색 결과가 없습니다.`
              }
            </h2>
          </div>
        )}

        {displayProducts.length > 0 ? (
          <ul className="search-phoneholder1">
            <li className="holder-list">
              {displayProducts.map((item, idx) => (
                <div key={item.id} className="item">
                  <NavLink to={`/productdetail/${item.id}`} className="holder-item">
                    <img src={imgPath + item.p_thumb} alt={item.p_name} className="holder-img" />
                  </NavLink>
                  <div className="info">
                    <h2>{item.p_name}</h2>
                    <span>{item.p_price ? `${parseInt(item.p_price).toLocaleString()}원` : '가격 문의'}</span>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        ) : hasSearched ? (
          <div className="no-results">
            <p>검색된 상품이 없습니다.</p>
            <p>다른 검색어로 시도해보세요.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchResult;