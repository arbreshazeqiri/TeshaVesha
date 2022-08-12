import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import { FaSearch, FaRegHeart, FaShoppingBag, FaTags, FaUser } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.css';
import Dropdown from 'react-bootstrap/Dropdown';



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
            <div className="auth" style={{display: "flex", justifyContent: "space-between"}}>
                <div className="wishlist-shoppingbag">
                    <Link className="wishlist-icon" to="/new"><FaRegHeart /> WISHLIST</Link>
                    <Link className="shoppingbag-icon" to="/new"><FaShoppingBag /> SHOPPING BAG</Link>
                </div>
                {user ? (
                    <div className="auth-icons">
                        <Link className="sell-icon" to="/new"><FaTags /> SELL</Link>
                        <div>
                            <Dropdown className="user-icon">
                                <Dropdown.Toggle className="inner-user-icon">
                                    <FaUser />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#">
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#" onClick={handleLogout}>
                                        Log out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <button id="styled-button-one" style={{marginLeft: "5px"}}><NavLink className="nav-link" to="/login">Log in</NavLink></button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;