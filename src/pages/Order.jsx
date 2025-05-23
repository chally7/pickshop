import React, { useState, useContext } from 'react';
import '../style/Order.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { GlobelState } from '../MyContext';

function Order() {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const navigate = useNavigate(); // navigate 추가
  const { addToCart, imgPath } = useContext(GlobelState);
  
  // 장바구니나 다른 페이지에서 전달된 상품 데이터
  const productData = location.state?.product || location.state?.products?.[0];

  console.log('Order 페이지 - 전달받은 데이터:', location.state);
  console.log('MyContext imgPath:', imgPath);
  console.log('상품 데이터:', productData);

  const currentProduct = productData || {
    p_name: '무선 블루투스 셀카봉',
    p_price: '8900',
    p_thumb: 'default.png'
  };

  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const productPrice = parseInt(currentProduct.p_price || 0);
  const totalProductPrice = productPrice * quantity;
  const deliveryFee = 3000;
  const finalPrice = totalProductPrice + deliveryFee;

  const handleAddToCart = () => {
    addToCart({...currentProduct, quantity: quantity});
    alert('장바구니에 담았습니다!');
    const goToCart = window.confirm('장바구니로 이동하시겠습니까?');
    if (goToCart) {
      navigate('/basket');
    }
  };

  const handlePurchase = () => {
    alert(`총 ${finalPrice.toLocaleString()}원 결제를 진행합니다!`);
  };

  // 닷홈 서버 이미지 URL - 다른 페이지와 동일한 방식
  const imageUrl = imgPath + currentProduct.p_thumb;
  console.log('최종 이미지 URL:', imageUrl);

  // 이미지 에러 처리 함수
  const handleImageError = (e) => {
    console.log('❌ 이미지 로딩 실패:', e.target.src);
    console.log('❌ 실패한 상품:', currentProduct);
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7snbTrr7jsp4Ag7JeG7J2MPC90ZXh0Pgo8L3N2Zz4=';
  };

  const handleImageLoad = () => {
    console.log('✅ 이미지 로딩 성공:', imageUrl);
  };

  return (
    <div className="order">
      <div className="order-box">
        <img 
          src={imageUrl}
          alt={currentProduct.p_name} 
          className="product-image"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="product-info">
          <h2>{currentProduct.p_name}</h2>
          <div className="price-row">
            <p className="price">
              {currentProduct.p_price ? `${productPrice.toLocaleString()}원` : '가격 문의'}
            </p>
            <p className="delivery">배송비 3,000원</p>
          </div>

          <div className="quantity-wrapper">
            <label>수량</label>
            <div className="quantity-box">
              <button onClick={decrease}>-</button>
              <span>{quantity}</span>
              <button onClick={increase}>+</button>
            </div>
          </div>

          <div className="total-price">
            <p className="final-total">총 결제금액: {finalPrice.toLocaleString()}원</p>
          </div>

          <div className="btn-row">
            <button className="btn-cart" onClick={handleAddToCart}>장바구니 담기</button>
            <button className="btn-buy" onClick={handlePurchase}>구매하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;