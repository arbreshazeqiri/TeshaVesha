import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Profile = () => {
  const { username } = useParams();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    console.log('HELLO?');
    axios
      .get(`http://localhost:8000/api/products-by-user/${username}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setProductList(res.data);
      })
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <div>
      <h1>You are viewing {username} Profile</h1>

      {productList.map((product) => (
        <div key={product._id}>
          <p>{product.title}</p>
          <p>{product.releaseYear}</p>
          <p>{product.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;