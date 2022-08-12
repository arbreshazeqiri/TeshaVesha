import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NewProduct = ({ isLoggedin, setIsLoggedin }) => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [delivery, setDelivery] = useState('');
  const [price, setPrice] = useState(0);
  // const [imageArray, setImageArray] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/current-user', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [isLoggedin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:8000/api/products',
        {
          title,
          description,
          location,
          category,
          condition,
          delivery,
          price,
          // imageArray,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
        navigate('/profile/' + user.username);
      })
      .catch((err) => setErrors(err.response.data.errors));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      {errors.title && <span className="text-danger">{errors.title.message}</span>}
      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      {errors.description && <span className="text-danger">{errors.description.message}</span>}
      <label>Location</label>
      <select value={location} name="location" onChange={(e) => setLocation(e.target.value)}>
        <option>Select a Location</option>
        <option value="Prishtinë">Prishtinë</option>
        <option value="Mitrovicë">Mitrovicë</option>
        <option value="Ferizaj">Ferizaj</option>
        <option value="Pejë">Pejë</option>
        <option value="Gjakovë">Gjakovë</option>
        <option value="Gjilan">Gjilan</option>
        <option value="Prizren">Prizren</option>
        <option value="Tiranë">Tiranë</option>
        <option value="Shkup">Shkup</option>
      </select>
      {errors.location && <span className="text-danger">{errors.location.message}</span>}
      <label>Category</label>
      <select value={category} name="category" onChange={(e) => setCategory(e.target.value)}>
        <option>Select a category</option>
        <option value="tops">Tops</option>
        <option value="bottoms">Bottoms</option>
        <option value="skirts">Skirts</option>
        <option value="jeans">Jeans</option>
        <option value="bags">Bags</option>
        <option value="glasses">Glasses</option>
        <option value="jewellery">Jewellery</option>
        <option value="shoes">Shoes</option>
        <option value="heels">Heels</option>
        <option value="sneakers">Sneakers</option>
      </select>
      {errors.category && <span className="text-danger">{errors.category.message}</span>}
      <label>Condition</label>
      <select value={condition} name="condition" onChange={(e) => setCondition(e.target.value)}>
        <option>Select product condition description</option>
        <option value="new">New</option>
        <option value="used">Used</option>
        <option value="fairly used">Fairly used</option>
      </select>
      {errors.condition && <span className="text-danger">{errors.condition.message}</span>}
      <label>Delivery</label>
      <select value={delivery} name="delivery" onChange={(e) => setDelivery(e.target.value)}>
        <option>Select delivery method</option>
        <option value="my own shipping">My own Shipping</option>
        <option value="pick up">Pick up</option>
      </select>
      {errors.delivery && <span className="text-danger">{errors.delivery.message}</span>}
      <label>Price</label>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      {errors.price && <span className="text-danger">{errors.price.message}</span>}
      <button id="styled-button-one">List item</button>
    </form>
  );
};

export default NewProduct;