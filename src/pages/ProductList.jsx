import React, { useContext } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { GlobelState } from '../MyContext';

const ProductList = () => {
  const { category } = useParams();
  const { getProductsByCategory, imgPath } = useContext(GlobelState);
  
  const categoryProducts = getProductsByCategory ? getProductsByCategory(decodeURIComponent(category)) : [];

  const containerStyle = {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '20px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  };

  const productBoxStyle = {
    textDecoration: 'none',
    color: 'inherit',
    border: '1px solid #eee',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const imageStyle = {
    width: '100%',
    height: '120px',
    objectFit: 'cover'
  };

  const infoStyle = {
    padding: '8px',
    flexGrow: 1
  };

  const nameStyle = {
    fontSize: '11px',
    margin: '0 0 5px 0',
    color: '#333',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    lineHeight: '1.3',
    height: '28px'
  };

  const priceStyle = {
    fontSize: '13px',
    fontWeight: '700',
    color: '#9b43ee',
    margin: 0
  };

  return (
    <div style={containerStyle}>
      <h2 style={{textAlign: 'center', marginBottom: '20px'}}>{decodeURIComponent(category)} 상품</h2>
      
      {categoryProducts.length === 0 ? (
        <div style={{textAlign: 'center', padding: '50px'}}>해당 카테고리의 상품이 없습니다.</div>
      ) : (
        <div style={gridStyle}>
          {categoryProducts.map(product => (
            <NavLink 
              key={product.id} 
              to={`/productdetail/${product.id}`} 
              style={productBoxStyle}
            >
              <img 
                src={imgPath + product.p_thumb} 
                alt={product.p_name} 
                style={imageStyle}
              />
              <div style={infoStyle}>
                <h3 style={nameStyle}>{product.p_name}</h3>
                <p style={priceStyle}>
                  {product.p_price ? parseInt(product.p_price).toLocaleString() + '원' : '가격 문의'}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;