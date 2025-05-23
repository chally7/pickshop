import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Search from './pages/Search';
import SearchResult from './pages/SearchResult';
import ProductList from './pages/ProductList';
import ProDetail from './pages/ProductDetail';
import Basket from './pages/Basket';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import Members from './pages/Members';
import Order from './pages/Order';
import Checkout from './pages/Checkout';
import MyContext from './MyContext';

function App() {
  return (
    <MyContext>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/productdetail/:id" element={<ProDetail />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/members" element={<Members />} />
          <Route path="/order" element={<Order />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Router>
    </MyContext>
  );
}

export default App;