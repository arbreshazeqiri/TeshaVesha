import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegHeart, FaShoppingBag } from 'react-icons/fa';

const Product = ({ isLoggedin, setIsLoggedin }) => {
  const [product, setProduct] = useState({});
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [creator, setCreator] = useState(null);
  const { id } = useParams();
  const [length, setLength] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
        setLength(res.data.names.length);
        setCreator(res.data.createdBy);
      })
      .catch((err) => console.log('GET MOVIE BY ID ERROR', err));
    axios
      .get('http://localhost:8000/api/current-user', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setUserId(res.data._id);
      })
      .catch((err) => console.log(err));
  }, [id, isLoggedin]);

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const addToWishlist = (productId) => {
  };

  const addToShoppingBag = (productId) => {
  };

  const runCallback = (cb) => {
    return cb();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "0em" }}>
      <h4 style={{ margin: "0", marginRight: "26em", marginBottom: "0.5em" }}>PRODUCT DETAILS</h4>
      <div className="app-wrapper">
        <div className="uploaded-images">
          <Carousel className="slides">
            {runCallback(() => {
              const row = [];
              for (var i = 0; i < length; i++) {
                row.push(<Carousel.Item key={i}><img src={require(`../../../server/public/${product.names[i]}`)} alt="smth"></img></Carousel.Item>);
              }
              return row;
            })
            }
          </Carousel>
        </div>
        <div className="form-wrapper">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          {console.log(creator, user)}
          <div className="details-buttons">
            {creator === userId ? (
              <div>
                <button id="styled-button-one"><Link to={`/product/edit/${product._id}`} style={{ textDecoration: "none", color: "white" }}>Edit</Link></button>
                <button id="styled-button-two" onClick={deleteProduct}>Delete</button>
              </div>
            ) : (
              <div>
                <button id="styled-button-one" onClick={addToWishlist}><FaRegHeart /></button>
                <button id="styled-button-two" onClick={addToShoppingBag}><FaShoppingBag /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;