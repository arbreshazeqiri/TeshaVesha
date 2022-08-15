import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';

const Shoppingbag = ({ isLoggedin, setIsLoggedin }) => {
    const [shoppingbag, setShoppingbag] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
      axios
        .get('http://localhost:8000/api/current-user', { withCredentials: true })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }, [isLoggedin]);

  return (
    <div className="even-more-container">
      <h2 style={{ margin: "0", marginTop: "0.5em", marginRight: "30em", marginBottom: "0.5em" }}>YOUR SHOPPING BAG</h2>
      <div className="container">
       {/* {shoppingbag? (shoppingbag.map((product) => (
          <div key={product._id} className="card">
            <Link to={`/product/${product._id}`}>
              <img src={require(`../../../server/public/${product.names[0]}`)} alt={product.title} />
            </Link>
          </div>
        ))) : null } */}
      </div>
    </div>
  );
};

export default Shoppingbag;