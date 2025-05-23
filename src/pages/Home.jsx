import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Home.scss';
import searchIcon from '../img/search.png';
import holder1Icon from '../img/holder1.PNG';
import { NavLink } from 'react-router-dom';
import { GlobelState } from '../MyContext';

const Home = () => {
  const { product, imgPath, bannerPath } = useContext(GlobelState);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  if (!product.length) return null;

  // 세일 상품으로 사용할 특정 상품 찾기 - "360도 회전 미끄럼방지" 상품
  const saleProduct = product.find(item => 
    item.p_name && item.p_name.includes('360도 회전 미끄럼방지')
  ) || product[0]; // 해당 상품이 없으면 첫 번째 상품을 대신 사용

  console.log(saleProduct);

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

  // 엔터키로 검색 (더 안전한 버전)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지
      handleSearch();
    }
  };

  // 상품 상세 페이지로 이동
  const goToProductDetail = (productId) => {
    navigate(`/productdetail/${productId}`);
  };

  // 검색 초기화
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHasSearched(false);
  };
  
  return (
    <div className="container">
      <article>
        <div className="search-wrapper">
          <input
            type="search"
            className="search-input"
            placeholder="상품 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>
            <img src={searchIcon} alt="검색" />
          </button>
        </div>

        {/* 검색 결과 표시 - Search.jsx와 동일한 스타일 적용 */}
        {hasSearched && (
          <section className="search-results">
            <div className="search-header">
              <h2 className="search-title">검색 결과</h2>
              <p className="search-count">
                {searchResults.length > 0 
                  ? `${searchResults.length}개의 상품`
                  : '검색 결과가 없습니다.'
                }
              </p>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="search-result-list">
                {searchResults.map(item => (
                  <div 
                    key={item.id} 
                    className="search-result-item"
                    onClick={() => goToProductDetail(item.id)}
                  >
                    <div className="search-item-image">
                      <img 
                        src={imgPath + item.p_thumb} 
                        alt={item.p_name}
                      />
                    </div>
                    <div className="search-item-info">
                      <h3 className="search-item-name">{item.p_name}</h3>
                      <p className="search-item-price">
                        {item.p_price ? `${parseInt(item.p_price).toLocaleString()}원` : '가격 문의'}
                      </p>
                      <div className="search-item-details">
                        <span className="search-item-rating">
                          <span className="star">★</span>
                          4.5
                        </span>
                        <span className="search-item-reviews">리뷰 128</span>
                        <span className="search-item-delivery">무료배송</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h2 className="no-results-title">검색 결과가 없습니다</h2>
                <p className="no-results-text">
                  다른 검색어를 입력하거나<br />
                  검색어의 철자를 확인해보세요
                </p>
              </div>
            )}
          </section>
        )}

        {/* 검색하지 않았을 때만 기본 콘텐츠 표시 */}
        {!hasSearched && (
          <>
            <div className="category-menu">
              <h2>카테고리</h2>
              <ul>
                <li className="menu-item">
                  <NavLink to="/category/셀카봉">
                    <span>셀카봉</span>
                  </NavLink>
                  <NavLink to="/category/휴대폰거치대">
                    <span>휴대폰 거치대</span>
                  </NavLink>
                  <NavLink to="/category/휴대폰충전기">
                    <span>휴대폰 충전기</span>
                  </NavLink>
                  <NavLink to="/category/악세사리">
                    <span>악세사리</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* 세일 상품 - 실제 상품 데이터로 연결 */}
            {saleProduct && (
              <NavLink to={`/productdetail/${saleProduct.id}`}>
                <div className="sale-item">
                  <img src={imgPath+saleProduct.p_thumb} alt={`${saleProduct.p_name} - 특별 할인상품`} className="sale-img" />
                </div>
              </NavLink>
            )}

            {/* 베스트 상품 */}
            <div className="best-item">
              <h2>베스트 상품</h2>
              <ul>
                {product.slice(0, 4).map((item) => (
                  <li className="bestitem-list" key={item.id}>
                    <NavLink to={`/productdetail/${item.id}`}>
                      <div>
                        <img src={imgPath + item.p_thumb} alt={item.p_name} className="best-img" />
                        <div className="product-info">
                          <p className="product-name">{item.p_name}</p>
                          <p className="product-price">
                            {item.p_price ? `${parseInt(item.p_price).toLocaleString()}원` : '가격 문의'}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* 인기 상품 */}
            <div className="pop-item">
              <h2>인기 상품</h2>
              <ul>
                {product.slice(4, 8).map((item) => (
                  <li className="pop-list" key={item.id}>
                    <NavLink to={`/productdetail/${item.id}`}>
                      <div>
                        <img src={imgPath + item.p_thumb} alt={item.p_name} className="pop-img" />
                        <div className="product-info">
                          <p className="product-name">{item.p_name}</p>
                          <p className="product-price">
                            {item.p_price ? `${parseInt(item.p_price).toLocaleString()}원` : '가격 문의'}
                          </p>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </article>
    </div>
  );
};

export default Home;