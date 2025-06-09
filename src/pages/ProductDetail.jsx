import React, { useContext } from 'react';
import '../style/ProductDetail.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobelState } from '../MyContext';

function ProductDetail() {
  const {id} = useParams();
  const {product, imgPath, addToCart} = useContext(GlobelState);
  const navigate = useNavigate();

  if(!product.length) return <div>상품을 불러오는 중...</div>;
  
  const detail = product.filter(item => item.id == id);
  
  if(!detail.length) return <div>상품을 찾을 수 없습니다.</div>;
  
  const currentProduct = detail[0];

  const handleAddToCart = () => {
    addToCart(currentProduct);
    alert('장바구니에 담았습니다!');
    const goToCart = window.confirm('장바구니로 이동하시겠습니까?');
    if (goToCart) {
      navigate('/basket');
    }
  };

  const handleBuyNow = () => {
    navigate('/order', { 
      state: {
        product: currentProduct,
        imgPath: imgPath
      }
    });
  };

  return (
    <div className="product-detail">
      <div className="main-image-section">
        <img 
          src={imgPath + currentProduct.p_thumb}
          alt={currentProduct.p_name}
          className="main-product-image"
        />
      </div>

      <div className="product-info-section">
        <h1 className="product-title">{currentProduct.p_name}</h1>
        <p className="product-price">
          {currentProduct.p_price ? parseInt(currentProduct.p_price).toLocaleString() + '원' : '가격 문의'}
        </p>
        
        <div className="product-description" dangerouslySetInnerHTML={{__html:currentProduct.p_content}}>
        </div>
      </div>

      <div className="product-actions">
        <button className="btn cart-btn" onClick={handleAddToCart}>
          장바구니 담기
        </button>
        <button className="btn buy-btn" onClick={handleBuyNow}>
          바로 구매
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;