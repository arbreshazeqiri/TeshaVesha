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

  return (
    <div className="container">
      {products.map((product) => (
        <div key={product._id} className="card">
          <span style={{ textAlign: 'left' }}>{product.category.toUpperCase()}</span>
          <h2>{product.title}</h2>
          <span>Posted by: <Link to={`/profile/${product.createdBy.username}`} style={{ color: '#C27BA0', textDecoration: 'none', fontWeight: "bold" }}>{product.createdBy.username}</Link></span>
          <img src={require(`../../../server/public/${product.names[0]}`)} alt={product.title} />
          <Link to={`/product/${product._id}`}>
            Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;