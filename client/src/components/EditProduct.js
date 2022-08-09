import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const EditProduct = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [boxArt, setBoxArt] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('');
  const [actors, setActors] = useState('');
  const [isKidFriendly, setIsKidFriendly] = useState(false);
  const [releaseYear, setReleaseYear] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setGenre(res.data.genre);
        setBoxArt(res.data.boxArt);
        setDuration(res.data.duration);
        setRating(res.data.rating);
        setActors(res.data.actors.join(', '));
        setIsKidFriendly(res.data.isKidFriendly);
        setReleaseYear(res.data.releaseYear);
      })
      .catch((err) => console.log('GET MOVIE BY ID ERROR', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/products/${id}`, {
        title,
        genre,
        boxArt,
        duration,
        rating,
        actors: actors.split(','),
        isKidFriendly,
        releaseYear,
      })
      .then((res) => {
        console.log(res.data);
        navigate('/');
      })
      .catch((err) => console.log('POST ERROR', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Genre</label>
      <select value={genre} name="genre" onChange={(e) => setGenre(e.target.value)}>
        <option>Select a Genre</option>
        <option value="Comedy">Comedy</option>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Action">Action</option>
        <option value="Family">Family</option>
        <option value="Animated">Animated</option>
        <option value="Documentary">Documentary</option>
        <option value="Romance">Romance</option>
        <option value="Silent Product">Silent Product</option>
        <option value="Thriller">Thriller</option>
        <option value="Crime Noir">Crime Noir</option>
        <option value="French Cinema">French Cinema</option>
      </select>
      <label>Box Art</label>
      <input type="text" value={boxArt} onChange={(e) => setBoxArt(e.target.value)} />
      <label>Duration</label>
      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      <label>Rating</label>
      <select value={rating} name="rating" onChange={(e) => setRating(e.target.value)}>
        <option>Select a Rating</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="NC-17">NC-17</option>
      </select>
      <label>Actors</label>
      <input
        type="text"
        value={actors}
        placeholder="enter actors with commas"
        onChange={(e) => setActors(e.target.value)}
      />
      <label> Kid Friendly</label>
      <input
        type="checkbox"
        checked={isKidFriendly}
        onChange={(e) => setIsKidFriendly(e.target.checked)}
      />
      <label> Release Year</label>
      <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />

      <button>Update Product</button>
    </form>
  );
};

export default EditProduct;