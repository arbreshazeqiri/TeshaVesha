import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';
import Carousel from 'react-bootstrap/Carousel';
import { FaUser } from 'react-icons/fa';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get('http://localhost:8000/api/users', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="even-more-container">
      <div className="banner">
        <Carousel className="banner-carousel">
          <Carousel.Item> <img src={require("../images/neutralbanner.jpg")} alt="banner" /></Carousel.Item>
          <Carousel.Item><img src={require(`../images/pizap.webp`)} alt="smth" /><button id="styled-button-one" className="banner-button">Shop now</button></Carousel.Item>
        </Carousel>
      </div>
      <h2 style={{ margin: "0", marginTop: "0.5em", marginRight: "30em", marginBottom: "0.5em" }}>HOT ON TESHAVESHA</h2>
      <div className="container">
        {products.map((product) => (
          <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
              <img src={require(`../../../server/public/${product.names[0]}`)} alt={product.title} />
            </Link>
          </div>
        ))}
      </div>
      <h2 style={{ margin: "0", marginLeft: "-1.8em", marginTop: "0.5em", marginRight: "30em", marginBottom: "0.5em" }}>POPULAR SELLERS</h2>
      <div className="users-container">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <Link to={`/profile/${user.username}`}>
              <div className="user-card-details">
              <FaUser />
              <span style={{color: "black"}}><span style={{fontSize: "30px", fontWeight: "bold", marginRight: "5px"}}>t</span>{user.username}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <h3 className="pre-footer">Be part of the community that is transforming fashion one item at a time.</h3>
    </div>
  );
};

export default ProductList;