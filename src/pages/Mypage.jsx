import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Mypage.scss';

function Mypage() {
  const navigate = useNavigate();
  
  // 로컬 스토리지에서 사용자 정보 가져오기
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const registeredUser = JSON.parse(localStorage.getItem('registeredUser')) || {};
  
  const userName = registeredUser.name || '사용자';
  const userEmail = currentUser.email || registeredUser.email || '';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <div className="mypage-container">
      {/* 프로필 영역 */}
      <div className="profile-section">
        <div className="avatar">
          👤
        </div>
        <h2 className="user-name">{userName}님</h2>
        <p className="user-email">{userEmail}</p>
      </div>

      {/* 메뉴 영역 */}
      <div className="menu-section">
        <div 
          className="menu-item"
          onClick={() => navigate('/basket')}
        >
          <span className="menu-text">
            <span className="menu-icon">🛒</span>
            장바구니
          </span>
          <span className="menu-arrow">→</span>
        </div>
        
        <div 
          className="menu-item"
          onClick={() => alert('주문내역 기능 준비중입니다')}
        >
          <span className="menu-text">
            <span className="menu-icon">📦</span>
            주문내역
          </span>
          <span className="menu-arrow">→</span>
        </div>
        
        <div 
          className="menu-item"
          onClick={() => alert('회원정보 수정 기능 준비중입니다')}
        >
          <span className="menu-text">
            <span className="menu-icon">⚙️</span>
            회원정보 수정
          </span>
          <span className="menu-arrow">→</span>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <button className="logout-btn" onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}

export default Mypage;