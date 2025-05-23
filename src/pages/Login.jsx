import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Members.scss';

const Login = () => {
  const navigate = useNavigate();
     
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
     
    // 로컬 스토리지에서 등록된 사용자 정보 확인
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
         
    if (!registeredUser) {
      setError('등록된 사용자가 없습니다. 먼저 회원가입을 해주세요.');
      setSuccess('');
      return;
    }
     
    // 이메일과 비밀번호 확인
    if (email === registeredUser.email && password === registeredUser.password) {
      setSuccess('로그인 성공!');
      setError('');
             
      // 로그인 상태 저장
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify({ email }));
             
      setTimeout(() => navigate('/'), 1000); // 1초 뒤 메인 페이지로 이동
    } else {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      setSuccess('');
    }
  };

  const handleFindClick = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // 2초 후 팝업 자동 닫기
  };

  return (
    <>
      <div className="members-box">
        <div className="members-form">
          <h2>로그인</h2>
                   
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
           
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
           
          {error && <p className="identify">{error}</p>}
          {success && <p className="success">{success}</p>}
           
          <button onClick={handleSubmit} className="join-btn">로그인</button>
          
          {/* 아이디/비밀번호 찾기 링크 추가 */}
          <div className="find-links">
            <button 
              type="button" 
              className="find-link" 
              onClick={handleFindClick}
            >
              아이디 찾기
            </button>
            <span className="separator">|</span>
            <button 
              type="button" 
              className="find-link" 
              onClick={handleFindClick}
            >
              비밀번호 찾기
            </button>
          </div>
                   
          <div className="login-links">
            <div className="signup-section">
              <p className="signup-text">아직 계정이 없으신가요?</p>
              <button
                 type="button"
                 className="signup-btn"
                onClick={() => navigate('/members')}
              >
                <span className="signup-icon">✨</span>
                회원가입
                <span className="signup-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 준비중 팝업 */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-icon">🚧</div>
            <h3>준비중입니다</h3>
            <p>해당 기능은 현재 준비중입니다.<br />빠른 시일 내에 서비스할 예정입니다.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;