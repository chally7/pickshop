import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Members.scss';

function Members() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [agreements, setAgreements] = useState({
    allAgree: false,
    termsRequired: false,
    marketingOptional: false
  });

  const [showModal, setShowModal] = useState({
    type: '',
    isOpen: false
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    
    if (name === 'allAgree') {
      setAgreements({
        allAgree: checked,
        termsRequired: checked,
        marketingOptional: checked
      });
    } else {
      const newAgreements = {
        ...agreements,
        [name]: checked
      };
      
      newAgreements.allAgree = newAgreements.termsRequired && newAgreements.marketingOptional;
      
      setAgreements(newAgreements);
    }
  };

  const showTerms = (type) => {
    setShowModal({ type, isOpen: true });
  };

  const closeModal = () => {
    setShowModal({ type: '', isOpen: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 필드 확인
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      setError('모든 필수 항목을 입력해주세요.');
      setSuccess('');
      return;
    }

    // 필수 약관 동의 확인
    if (!agreements.termsRequired) {
      setError('필수 약관에 동의해주세요.');
      setSuccess('');
      return;
    }

    // 비밀번호 확인
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      setSuccess('');
      return;
    }

    // 비밀번호 최소 길이 확인
    if (formData.password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      setSuccess('');
      return;
    }

    // 이메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      setSuccess('');
      return;
    }

    // 회원가입 정보 저장 (로컬 스토리지)
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      marketingAgreed: agreements.marketingOptional
    };
    
    localStorage.setItem('registeredUser', JSON.stringify(newUser));

    setSuccess('회원가입이 완료되었습니다!');
    setError('');
    
    // 폼 초기화
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });

    setAgreements({
      allAgree: false,
      termsRequired: false,
      marketingOptional: false
    });

    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="members-box">
      <h2>회원가입</h2>

      <div className="members-form">
        <label htmlFor="name">
          이름<span className="identify">*</span>
        </label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="이름 입력"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="email">
          이메일<span className="identify">*</span>
        </label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="이메일 입력"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">
          비밀번호<span className="identify">*</span>
        </label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="비밀번호 입력"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword">
          비밀번호 확인<span className="identify">*</span>
        </label>
        <input 
          type="password" 
          name="confirmPassword" 
          id="confirmPassword" 
          placeholder="비밀번호 재입력"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <label htmlFor="phone">
          연락처<span className="identify">*</span>
        </label>
        <input 
          type="tel" 
          name="phone" 
          id="phone" 
          placeholder="전화번호 입력"
          value={formData.phone}
          onChange={handleChange}
        />

        {/* 약관 동의 섹션 */}
        <div className="agreement-section">
          <div className="agreement-item all-agree">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="allAgree"
                checked={agreements.allAgree}
                onChange={handleAgreementChange}
              />
              <span className="checkmark"></span>
              <span className="agreement-text">서비스 이용약관 전체 동의</span>
            </label>
          </div>

          <div className="agreement-item">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="termsRequired"
                checked={agreements.termsRequired}
                onChange={handleAgreementChange}
              />
              <span className="checkmark"></span>
              <span className="agreement-text">
                <span className="required">[필수]</span> 이용약관 및 개인정보처리방침
              </span>
            </label>
            <button 
              type="button" 
              className="terms-view-btn"
              onClick={() => showTerms('terms')}
            >
              약관 보기
            </button>
          </div>

          <div className="agreement-item">
            <label className="checkbox-container">
              <input
                type="checkbox"
                name="marketingOptional"
                checked={agreements.marketingOptional}
                onChange={handleAgreementChange}
              />
              <span className="checkmark"></span>
              <span className="agreement-text">
                <span className="optional">[선택]</span> 마케팅 정보 수집 및 수신 동의
              </span>
            </label>
            <button 
              type="button" 
              className="terms-view-btn"
              onClick={() => showTerms('marketing')}
            >
              약관 보기
            </button>
          </div>
        </div>

        {error && <p className="identify">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button onClick={handleSubmit} className="join-btn">가입하기</button>
        
        <div className="login-links">
          <p>
            이미 계정이 있으신가요? 
            <button 
              type="button" 
              className="link-btn"
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
          </p>
        </div>
      </div>

      {/* 약관 모달 */}
      {showModal.isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {showModal.type === 'terms' 
                  ? '이용약관 및 개인정보처리방침' 
                  : '마케팅 정보 수집 및 수신 동의'}
              </h3>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              {showModal.type === 'terms' ? (
                <div>
                  <h4>제1조 (목적)</h4>
                  <p>본 약관은 PICKSHOP(이하 "회사"라 한다.)이  제공하는 서비스의 이용과 관련하여 회사와 이용자간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                  
                  <h4>제2조 (정의)</h4>
                  <p>1. "서비스"라 함은 회사가 제공하는 모든 서비스를 의미합니다.</p>
                  <p>2. "이용자"라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</p>
                  
                  <h4>개인정보처리방침</h4>
                  <p>회사는 개인정보 보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리 할수 있도록 다음과 같은 처리방침을 두고 있습니다.</p>
                </div>
              ) : (
                <div>
                  <h4>마케팅 정보 수집 및 이용 동의</h4>
                  <p>회사는 서비스 향상 및 맞춤형 서비스 제공을 위해 다음과 같은 마케팅 정보를 수집하고 이용합니다.</p>
                  
                  <h4>수집하는 정보</h4>
                  <p>- 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</p>
                  <p>- 광고 식별자, 서비스 이용 기록</p>
                  
                  <h4>이용 목적</h4>
                  <p>- 맞춤형 상품 및 서비스 추천</p>
                  <p>- 이벤트 및 광고성 정보 제공</p>
                  <p>- 시장조사 및 상품/서비스 개발・개선</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="modal-confirm" onClick={closeModal}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Members;