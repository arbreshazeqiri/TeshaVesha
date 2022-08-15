import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';

const Wishlist = ({ isLoggedin, setIsLoggedin }) => {
    const [user, setUser] = useState([]);
    const [wishlist, setWishlist] = useState(null);
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/current-user', { withCredentials: true })
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => console.log(err));
    }, [isLoggedin]);

    const findWishlistItem = (id) => {
        axios
            .get(`http://localhost:8000/api/products/${id}`)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch((err) => console.log('GET MOVIE BY ID ERROR', err));
    };


    return (
        <div className="even-more-container">
            <h2 style={{ margin: "0", marginTop: "0.5em", marginRight: "30em", marginBottom: "0.5em" }}>YOUR FAVORITE ITEMS</h2>
            <div className="container">
                {/* {wishlist.map((product) => (
                    <div key={product._id} className="card">
                        <Link to={`/product/${product._id}`}>
                            <img src={require(`../../../server/public/${product.names[0]}`)} alt={product.title} />
                        </Link>
                    </div>
                ))} */}
            </div>
        </div>
    );
};

export default Wishlist;