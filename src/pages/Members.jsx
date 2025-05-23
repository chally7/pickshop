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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 필드 확인
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      setError('모든 필수 항목을 입력해주세요.');
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
      phone: formData.phone
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

    setTimeout(() => navigate('/login'), 2000); // 2초 뒤 로그인 페이지로 이동
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
    </div>
  );
}

export default Members;