import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import NewProduct from './components/NewProduct';
import Product from './components/Product';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Shoppingbag from './components/Shoppingbag';
function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App" style={{minHeight: "100vh"}}>
        <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/new" element={<NewProduct setIsLoggedin={setIsLoggedin} />} />
          <Route path="/product/:id" element={<Product setIsLoggedin={setIsLoggedin} />} />
          <Route path="/product/edit/:id" element={<EditProduct setIsLoggedin={setIsLoggedin} />} />
          <Route path="/login" element={<Login setIsLoggedin={setIsLoggedin} />} />
          <Route path="/register" element={<Register setIsLoggedin={setIsLoggedin} />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist setIsLoggedin={setIsLoggedin}/>} />
          <Route path="/shoppingbag" element={<Shoppingbag setIsLoggedin={setIsLoggedin}/>} />
        </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;