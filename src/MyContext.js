import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const GlobelState = createContext();

function MyContext({children}) {
    let [product,setProduct] = useState([]);
    let [chargerProducts, setChargerProducts] = useState([]);
    let [cart, setCart] = useState([]);
    const imgPath = '/upload/';
    const bannerPath = '/admin/banner/';

    // 장바구니에 상품 추가
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item => 
                item.id === product.id 
                ? {...item, quantity: item.quantity + 1}
                : item
            ));
        } else {
            setCart([...cart, {...product, quantity: 1, checked: false}]);
        }
    };

    // 장바구니에서 상품 제거
    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    // 체크박스 상태 변경
    const toggleCartItemCheck = (productId) => {
        setCart(cart.map(item => 
            item.id === productId 
            ? {...item, checked: !item.checked}
            : item
        ));
    };

    // 수량 조절 함수 추가
    const updateCartQuantity = (productId, action) => {
        setCart(cart.map(item => {
            if (item.id === productId) {
                if (action === 'increase') {
                    return {...item, quantity: item.quantity + 1};
                } else if (action === 'decrease' && item.quantity > 1) {
                    return {...item, quantity: item.quantity - 1};
                }
            }
            return item;
        }));
    };

    // 카테고리별 상품 필터링 함수 (수정됨)
    const getProductsByCategory = (category) => {
        return product.filter(item => {
            const productName = item.p_name ? item.p_name.toLowerCase() : '';
            const categoryLower = category.toLowerCase();
            
            switch(categoryLower) {
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
                    // "충전기"만 포함하고 "충전"은 제외
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

    useEffect(()=>{
        axios.get('/admin/api/p_list.php')
        .then(res=>{
            console.log(res.data);
            setProduct(res.data);
            
            // 디버깅: 모든 상품명 출력
            console.log('모든 상품명:', res.data.map(item => item.p_name));
            
            const chargerItems = res.data.filter(item => 
                item.p_name && item.p_name.includes('충전기')
            );
            setChargerProducts(chargerItems);
        })
    },[])

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
    )
}

export default MyContext