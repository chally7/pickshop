import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import homeBtn from '../img/home_btn.png';
import backBtn from '../img/back_btn.png';
import '../style/Header.scss';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-top">
        <NavLink to="/" className="home-btn">
          <img src={homeBtn} alt="홈" />
        </NavLink>
      </div>

      <div className="header-bottom">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <img src={backBtn} alt="뒤로가기" />
        </button>
      </div>
    </div>
  );
};

export default Header;
