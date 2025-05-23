// src/pages/ProductList.jsx

import React from 'react';
import { useParams, NavLink } from 'react-router-dom';

const mockProducts = {
  '셀카봉': [
    { id: 1, name: '셀카봉 A', image: '/img/selfie1.jpg' },
    { id: 2, name: '셀카봉 B', image: '/img/selfie2.jpg' },
    { id: 3, name: '셀카봉 C', image: '/img/selfie3.jpg' },
    { id: 4, name: '셀카봉 D', image: '/img/selfie4.jpg' },
    { id: 5, name: '셀카봉 E', image: '/img/selfie5.jpg' },
  ],
  '휴대폰 거치대': [
    { id: 6, name: '거치대 A', image: '/img/holder1.jpg' },
    { id: 7, name: '거치대 B', image: '/img/holder2.jpg' },
    { id: 8, name: '거치대 C', image: '/img/holder3.jpg' },
    { id: 9, name: '거치대 D', image: '/img/holder4.jpg' },
    { id: 10, name: '거치대 E', image: '/img/holder5.jpg' },
  ],
  '휴대폰 충전기': [
    { id: 1, name: '셀카봉 A', image: '/img/charger1.jpg' },
    { id: 2, name: '셀카봉 B', image: '/img/charger2.jpg' },
    { id: 3, name: '셀카봉 C', image: '/img/charger3.jpg' },
    { id: 4, name: '셀카봉 D', image: '/img/charger4.jpg' },
    { id: 5, name: '셀카봉 E', image: '/img/charger5.jpg' },
  ],
  '악세사리': [
    { id: 6, name: '거치대 A', image: '/img/acc1.jpg' },
    { id: 7, name: '거치대 B', image: '/img/acc2.jpg' },
    { id: 8, name: '거치대 C', image: '/img/acc3.jpg' },
    { id: 9, name: '거치대 D', image: '/img/acc4.jpg' },
    { id: 10, name: '거치대 E', image: '/img/acc5.jpg'},
  ],
};

const ProductList = () => {
  const { category } = useParams();
  const products = mockProducts[category] || [];

  return (
    <div className="product-list">
      <h2>{category}</h2>
      <div className="product-grid">
        {products.map(product => (
          <NavLink key={product.id} to={`/product/${product.id}`} className="product-box">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
