import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaStar, FaRegStar } from 'react-icons/fa';

const Profile = () => {
  const { username } = useParams();
  const [name, setName] = useState(null);
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    console.log('HELLO?');
    axios
      .get(`http://localhost:8000/api/products-by-user/${username}`, { withCredentials: true })
      .then((res) => {
        setName(res.data[1].firstname.toUpperCase() + " " + res.data[1].lastname.toUpperCase());
        setProductList(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [username]);

  return (
    <div className="even-more-profile-container">
      <div className="profile-info">
        <div className="profile-pic">
          <FaUser />
        </div>
        <div className="profile-user-info">
        <h3 style={{fontWeight: "bold", fontStyle: "italic"}}>{name}</h3>
        <h4>@{username}</h4>
        <h5><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStar/> (18)</h5>
        </div>
      </div>
      <h2>ALL POSTS</h2>
      <div className="profile-container">
        {productList.map((product) => (
          <div key={product._id} className="profile-card">
            <Link to={`/product/${product._id}`}>
              <img src={require(`../../../server/public/${product.names[0]}`)} alt={product.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;