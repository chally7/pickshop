import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const GlobelState = createContext();

function MyContext({ children }) {
  const [product, setProduct] = useState([]);
  const [chargerProducts, setChargerProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const imgPath = process.env.REACT_APP_IMGPATH + '/upload/';
  const bannerPath = '/admin/banner/';

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, checked: false }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const toggleCartItemCheck = (productId) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, checked: !item.checked }
        : item
    ));
  };

  const updateCartQuantity = (productId, action) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        if (action === 'increase') {
          return { ...item, quantity: item.quantity + 1 };
        } else if (action === 'decrease' && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    }));
  };

  const getProductsByCategory = (category) => {
    return product.filter(item => {
      const productName = item.p_name ? item.p_name.toLowerCase() : '';
      const categoryLower = category.toLowerCase();

      switch (categoryLower) {
        case '셀카봉':
          return productName.includes('셀카봉') ||
            productName.includes('selfie') ||
            productName.includes('stick');

        case '휴대폰거치대':
          return productName.includes('거치대') ||
            productName.includes('스탠드') ||
            productName.includes('홀더') ||
            productName.includes('holder') ||
            productName.includes('stand');

        case '휴대폰충전기':
          return productName.includes('휴대폰충전기') ||
            productName.includes('폰충전기') ||
            productName.includes('핸드폰충전기') ||
            (productName.includes('충전기') &&
              !productName.includes('무선충전') &&
              !productName.includes('워치') &&
              !productName.includes('갤럭시워치') &&
              !productName.includes('애플워치')) ||
            productName.includes('charger');

        case '악세사리':
          return productName.includes('악세사리') ||
            productName.includes('케이스') ||
            productName.includes('링') ||
            productName.includes('톡') ||
            productName.includes('마그네틱') ||
            productName.includes('자석') ||
            productName.includes('워치') ||
            productName.includes('갤럭시워치') ||
            productName.includes('애플워치') ||
            productName.includes('무선충전') ||
            (!productName.includes('셀카봉') &&
              !productName.includes('거치대') &&
              !productName.includes('휴대폰충전기') &&
              !productName.includes('폰충전기') &&
              !(productName.includes('충전기') &&
                !productName.includes('무선충전') &&
                !productName.includes('워치')));
        default:
          return false;
      }
    });
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_URL + '/admin/api/p_list.php')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProduct(res.data);
          const chargerItems = res.data.filter(item =>
            item.p_name && item.p_name.includes('충전기')
          );
          setChargerProducts(chargerItems);
        } else {
          console.error('상품 데이터 형식이 배열이 아님:', res.data);
          setProduct([]);
        }
      })
      .catch(error => {
        console.error('상품 불러오기 실패:', error);
        setProduct([]);
      });
  }, []);

  return (
    <GlobelState.Provider value={{
      product,
      chargerProducts,
      cart,
      addToCart,
      removeFromCart,
      toggleCartItemCheck,
      updateCartQuantity,
      getProductsByCategory,
      imgPath,
      bannerPath
    }}>
      {children}
    </GlobelState.Provider>
  );
}

export default MyContext;
