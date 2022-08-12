import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Login = ({ setIsLoggedin }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/login', user, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setIsLoggedin(true);
                navigate('/');
            })
            .catch((err) => console.log(err));
    };
    return (<div className="login-form">
        <form onSubmit={handleSubmit}>
        <h2>Log in to Continue</h2>
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
            <input type="text" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
            <button id="styled-button-two" style={{width: "300px"}}>Login</button>
        </form>
        <span>Don't have an account?</span>
        <button id="styled-button-one" style={{width: "300px"}}><NavLink className="nav-link" to="/register">Sign up</NavLink></button>
    </div>
    );
};

export default Login;