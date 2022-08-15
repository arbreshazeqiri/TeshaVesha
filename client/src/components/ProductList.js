import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';
import Carousel from 'react-bootstrap/Carousel';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/products', { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
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
      <h2 style={{ margin: "0", marginRight: "30em", marginBottom: "0.5em" }}>HOT ON TESHAVESHA</h2>
      <div className="container">
        {products.map((product) => (
          <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
              <img src={require(`../../../server/public/${product.names[0]}`)} alt={product.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;