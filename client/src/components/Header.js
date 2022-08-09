import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { FaSearch, FaHeart, FaShoppingBag } from 'react-icons/fa';

const Header = ({ isLoggedin, setIsLoggedin }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios
            .get('http://localhost:8000/api/current-user', { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, [isLoggedin]);

    const handleSubmit = (e) => {
    };

    const handleChange = (e) => {
    };

    const handleLogout = () => {
        axios
            .post('http://localhost:8000/logout', {}, { withCredentials: true })
            .then((res) => {
                setUser(null);
            })
            .catch((err) => console.log(err));
    };
    return (
        <header className="header">
            <NavLink className="nav-link" to="/">
                <h1>TeshaVesha</h1>
            </NavLink>
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <button className="search-icon"><FaSearch /></button>
                    <input type="text" name="search-box" placeholder='Search for items, brands, or styles...' onChange={handleChange} required />
                </form>
            </div>
            <div className="wishlist-shoppingbag">
                <button><FaHeart /></button>
                <button><FaShoppingBag /></button>
            </div>
            <div className="auth">
                {user ? (
                    <div>
                        <NavLink className="nav-link" to="/new">
                            Add a New Product
                        </NavLink>
                        <p>Hello: {user.username}</p>
                        <button id="styled-button-two" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <button id="styled-button-one"><NavLink className="nav-link" to="/register">Sign up</NavLink></button>
                        <button id="styled-button-two"><NavLink className="nav-link" to="/login">Log in</NavLink></button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;