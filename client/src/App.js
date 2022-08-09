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
function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <BrowserRouter>
      <div className="App">
        <Header isLoggedin={isLoggedin} setIsLoggedin={setIsLoggedin} />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/new" element={<NewProduct setIsLoggedin={setIsLoggedin} />} />
          <Route path="/product/:id" element={<Product setIsLoggedin={setIsLoggedin} />} />
          <Route path="/product/edit/:id" element={<EditProduct setIsLoggedin={setIsLoggedin} />} />
          <Route path="/login" element={<Login setIsLoggedin={setIsLoggedin} />} />
          <Route path="/register" element={<Register setIsLoggedin={setIsLoggedin} />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;