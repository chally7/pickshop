import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import '../style/Home.scss';
import searchIcon from '../img/search.png';
import holder1Icon from '../img/holder1.PNG';
import { GlobelState } from '../MyContext';

const Home = () => {
  const { product, imgPath, bannerPath } = useContext(GlobelState);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  console.log('Home 컴포넌트 렌더링됨');
  console.log('product 데이터:', product);
  console.log('product 길이:', product?.length);

  if (!product || !product.length) return <div>상품을 불러오는 중...</div>;

  // 세일 상품으로 사용할 특정 상품 찾기
  const saleProduct = product.find(item =>
    item.p_name && item.p_name.includes('360도 회전 미끄럼방지')
  ) || product[0];

  console.log(saleProduct);

  // 고급 검색 함수
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

  // 검색 실행 함수
  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setHasSearched(true);

    const results = product.filter(item => {
      if (!item.p_name) return false;
      return advancedSearch(searchTerm, item.p_name);
    });

    setSearchResults(results);

    console.log('검색어:', searchTerm);
    console.log('검색결과:', results.length, '개');
  };

  // 엔터키로 검색
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
          <div className="search-input-container">
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
        </div>

        {/* 검색결과 표시 */}
        {hasSearched && (
          <div className="search-results-section">
            <div className="search-results-header">
              <h3>
                {searchResults.length > 0
                  ? `'${searchTerm}' 검색결과 (${searchResults.length}개)`
                  : `'${searchTerm}' 검색결과가 없습니다.`
                }
              </h3>
              <button className="clear-search-btn" onClick={clearSearch}>
                전체상품으로 돌아가기
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="search-results-grid">
                {searchResults.map(item => (
                  <div
                    key={item.id}
                    className="search-result-item"
                    onClick={() => goToProductDetail(item.id)}
                  >
                    <img
                      src={imgPath + item.p_thumb}
                      alt={item.p_name}
                      className="search-result-image"
                    />
                    <div className="search-result-info">
                      <h4 className="search-result-name">{item.p_name}</h4>
                      <p className="search-result-price">
                        {item.p_price ? `${parseInt(item.p_price).toLocaleString()}원` : '가격 문의'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
                    <span>휴대폰거치대</span>
                  </NavLink>
                  <NavLink to="/category/휴대폰충전기">
                    <span>휴대폰충전기</span>
                  </NavLink>
                  <NavLink to="/category/악세사리">
                    <span>악세사리</span>
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* 세일 상품 */}
            {saleProduct && (
              <NavLink to={`/productdetail/${saleProduct.id}`}>
                <div className="sale-item">
                  <img src={imgPath + saleProduct.p_thumb} alt={`${saleProduct.p_name} - 특가 할인상품`} className="sale-img" />
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