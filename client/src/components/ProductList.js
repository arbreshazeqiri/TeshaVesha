import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';
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
  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/products/${productId}`)
      .then((res) => {
        const newProducts = products.filter((product) => product._id !== productId);
        setProducts(newProducts);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      {products.map((product) => (
        <div key={product._id} className="card">
          <h2>{product.title}</h2>
          <Link to={`/profile/${product.createdBy.username}`}>{product.createdBy.username}</Link>
          <br />
          <img src={product.boxArt} alt={product.title} />
          <br />
          <Link to={`/product/${product._id}`}>Details</Link>
          <span> | </span>
          <Link to={`/product/edit/${product._id}`}>Edit</Link>
          <br />
          <button style={{ marginTop: '1rem' }} onClick={() => deleteProduct(product._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;