import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import promoPicture from './promopic.webp';

const Register = ({ setIsLoggedin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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
      .post('http://localhost:8000/register', user, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setIsLoggedin(true);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="register-form">
      <div className="promo-pic">
        <h2>Get ready</h2>
        <img src={promoPicture} style={{ height: "400px" }} alt="promo picture"></img>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input type="text" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
        <input
          type="text"
          name="confirmPassword"
          placeholder='Confirm Password'
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />
        <button id="styled-button-one" style={{ width: "310px" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;