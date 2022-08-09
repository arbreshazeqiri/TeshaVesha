import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => console.log('GET MOVIE BY ID ERROR', err));
  }, [id]);
  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h2>{product.title}</h2>
      <p>genre: {product.genre}</p>
      <img src={product.boxArt} alt={product.title} />
      <p>duration: {product.duration}</p>
      <p>rating: {product.rating}</p>
      <p>actors: {product.actors && product.actors.join(', ')}</p>
      <p>{product.isKidFriendly ? 'Okay for kids!!' : 'NOT for Kids'}</p>
      <p>releaseYear: {product.releaseYear}</p>
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
};

export default Product;