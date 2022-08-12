import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import promoPicture from '../images/promopic.webp';

const Register = ({ setIsLoggedin }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: '',
    lastname:'',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    country: 'Kosovo',
    products: [],
    wishlist: [],
    shoppingbag: [],
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
    <div className="register-form" style={{marginTop: '3em'}}>
      <div className="promo-pic">
        <h2>Get ready</h2>
        <img src={promoPicture} style={{ height: "400px" }} alt="promo"></img>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <input type="text" name="firstname" placeholder="First Name" value={user.firstname} onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Last Name" value={user.lastname} onChange={handleChange} required />
        </div>
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} required />
        <input type="text" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
        <input
          type="text"
          name="confirmPassword"
          placeholder='Confirm Password'
          value={user.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="country-section">
          <label style={{ margin: "0px" }}>Your location: </label>
          <select value={user.country} name="country" onChange={handleChange} required>
            <option value="Kosovo">Kosovo</option>
            <option value="Albania">Albania</option>
            <option value="North Macedonia">North Macedonia</option>
          </select>
        </div>
        <span className="terms-checkbox">
          <input type="checkbox" name="terms" placeholder="Terms and Conditions" style={{ width: "20px" }} />I agree to the<a href="/" style={{ padding: "0px 3px" }}>Terms of Use</a>and<a href="/" style={{ padding: "0px 3px" }}>Privacy Policy.</a>
        </span>
        <button id="styled-button-one" type="submit" name="register" style={{ width: "310px" }}>Register</button>
      </form>
    </div>
  );
};

export default Register;