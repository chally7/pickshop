import React from 'react';
import homeIcon from '../img/home.png';
import searchIcon from '../img/search.png';
import myPageIcon from '../img/mypage.png';
import cartIcon from '../img/basket.png';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/Footer.scss';

function Footer() {
  const navigate = useNavigate();

  // 로그인 상태 확인
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // 마이페이지 클릭 핸들러
  const handleMyPageClick = (e) => {
    e.preventDefault(); // 기본 NavLink 동작 방지
    
    if (isLoggedIn) {
      navigate('/mypage'); // 로그인 된 상태 → 마이페이지
    } else {
      navigate('/login');  // 로그인 안 된 상태 → 로그인 페이지
    }
  };

  return (
    <div className="footer">
      <NavLink to="/">
        <img src={homeIcon} alt="홈" />
      </NavLink>
      
      <NavLink to="/search">
        <img src={searchIcon} alt="검색" />
      </NavLink>
      
      {/* 마이페이지는 로그인 상태에 따라 다른 페이지로 이동 */}
      <div onClick={handleMyPageClick} style={{ cursor: 'pointer' }}>
        <img src={myPageIcon} alt="마이페이지" />
      </div>
      
      <NavLink to="/basket">
        <img src={cartIcon} alt="장바구니" />
      </NavLink>
    </div>
  );
}

export default Footer;