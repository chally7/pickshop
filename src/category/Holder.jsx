import React from 'react';
import ProductList from '../category/ProductList';
import '../style/Category.scss';

const Selfie = () => {
  return (
    <div className="category-container">
      <h1>셀카봉</h1>
      <div className="product-list">
        {ProductList.selfie.map(product => (
          <div className="product-item" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selfie;
