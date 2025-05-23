import React from 'react';
import '../style/Checkout.scss';

function Checkout() {
  return (
    <div className="checkout-page">
      <div className="delivery-info">
        <h2>배송정보</h2>
        <span className="name">홍길동</span>
        <p className="address">서울특별시 강남구 강남대로123길99 1005호</p>
        <span className="phone">010-1234-5678</span>
      </div>

      <div className="payment-options">
        <h2>결제 방법</h2>
        <form>
          <div className="option-container">
            <label className="check-box1">
              <input type="radio" name="option" value="1" defaultChecked />
              <span className="radio-text">신용/체크카드</span>
            </label>
          </div>
          
          <div className="option-container">
            <label className="check-box2">
              <input type="radio" name="option" value="2" />
              <span className="radio-text">계좌이체/무통장 입금</span>
            </label>
          </div>
        </form>
      </div>

      <div className="checkout-button">
        <button type="button">결제하기</button>
      </div>
    </div>
  );
}

export default Checkout;