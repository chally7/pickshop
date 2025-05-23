import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/Basket.scss';
import { GlobelState } from '../MyContext';

function Basket() {
  const { cart, removeFromCart, toggleCartItemCheck, imgPath, updateCartQuantity } = useContext(GlobelState);
  const navigate = useNavigate();

  // 이미지 URL 디버깅
  console.log('imgPath:', imgPath);
  console.log('cart items:', cart);

  // 체크된 상품들
  const checkedItems = cart.filter(item => item.checked);
  
  // 총 상품 금액 계산
  const totalProductPrice = checkedItems.reduce((sum, item) => {
    return sum + (parseInt(item.p_price || 0) * item.quantity);
  }, 0);

  // 총 수량 계산
  const totalQuantity = checkedItems.reduce((sum, item) => sum + item.quantity, 0);

  // 배송비 계산 (10개까지 3000원, 10개 초과시 3000원씩 추가)
  const calculateDeliveryFee = (quantity) => {
    if (quantity === 0) return 0;
    const baseFee = 3000;
    const additionalFee = Math.floor(quantity / 10) * 3000;
    return baseFee + additionalFee;
  };

  const deliveryFee = calculateDeliveryFee(totalQuantity);
  const totalPrice = totalProductPrice + deliveryFee;

  // 구매하기 버튼 클릭
  const handlePurchase = () => {
    if (checkedItems.length === 0) {
      alert('구매할 상품을 선택해주세요.');
      return;
    }
    navigate('/order', { 
      state: { 
        products: checkedItems,
        imgPath: imgPath,
        totalPrice: totalPrice,
        deliveryFee: deliveryFee
      }
    });
  };

  // 수량 증가
  const increaseQuantity = (productId) => {
    updateCartQuantity(productId, 'increase');
  };

  // 수량 감소
  const decreaseQuantity = (productId) => {
    updateCartQuantity(productId, 'decrease');
  };

  // 이미지 에러 처리 함수
  const handleImageError = (e) => {
    console.log('이미지 로딩 실패:', e.target.src);
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEwIiBoZWlnaHQ9IjExMCIgdmlld0JveD0iMCAwIDExMCAxMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMTAiIGhlaWdodD0iMTEwIiBmaWxsPSIjZjBmMGYwIi8+Cjx0ZXh0IHg9IjU1IiB5PSI1NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+64W47J207KeAIOyXhuydjDwvdGV4dD4KPC9zdmc+';
  };

  return (
    <div className="basket-page">
      <div className="basket-header">
        <h2>장바구니</h2>
        <span className="item-count">({cart.length}개 상품)</span>
      </div>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>장바구니가 비어있습니다.</p>
          <NavLink to="/" className="continue-shopping">쇼핑 계속하기</NavLink>
        </div>
      ) : (
        <>
          <ul className="basket">
            {cart.map((item) => {
              const imageUrl = imgPath + item.p_thumb;
              
              // 디버깅용 로그 추가
              console.log('=== 장바구니 이미지 디버깅 ===');
              console.log('imgPath:', imgPath);
              console.log('item.p_thumb:', item.p_thumb);
              console.log('완성된 imageUrl:', imageUrl);
              console.log('item 전체 데이터:', item);
              console.log('================================');
              
              return (
                <li key={item.id} className="basket-item">
                  <div className="item-header">
                    <strong className="product-name">{item.p_name}</strong>
                    <button 
                      className="remove-btn-top"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="product-container">
                    <div className="image-section">
                      <input 
                        type="checkbox" 
                        checked={item.checked}
                        onChange={() => toggleCartItemCheck(item.id)}
                        className="item-checkbox"
                      />
                      <img 
                        src={imageUrl} 
                        alt={item.p_name} 
                        className="product-img" 
                        onError={(e) => {
                          console.log('❌ 이미지 로딩 실패:', e.target.src);
                          console.log('❌ 실패한 아이템:', item);
                          handleImageError(e);
                        }}
                        onLoad={() => {
                          console.log('✅ 이미지 로딩 성공:', imageUrl);
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <div className="price-section">
                        <div className="price">
                          {item.p_price ? `₩${parseInt(item.p_price).toLocaleString()}` : '가격 문의'}
                        </div>
                      </div>
                      
                      <div className="quantity-section">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn minus"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="quantity-btn plus"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                        <div className="item-total">
                          소계: ₩{(parseInt(item.p_price || 0) * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          
          {checkedItems.length > 0 && (
            <div className="purchase-section">
              <div className="total-info">
                <div className="price-breakdown">
                  <div className="breakdown-item">
                    <span>상품금액 ({totalQuantity}개)</span>
                    <span>₩{totalProductPrice.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>배송비</span>
                    <span>₩{deliveryFee.toLocaleString()}</span>
                  </div>
                  <div className="breakdown-total">
                    <span>총 결제금액</span>
                    <span className="total-price">₩{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button 
                className="purchase-btn"
                onClick={handlePurchase}
              >
                구매하기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Basket;