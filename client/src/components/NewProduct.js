import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NewProduct = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [boxArt, setBoxArt] = useState('');
  const [duration, setDuration] = useState('');
  const [rating, setRating] = useState('');
  const [actors, setActors] = useState('');
  const [isKidFriendly, setIsKidFriendly] = useState(false);
  const [releaseYear, setReleaseYear] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'http://localhost:8000/api/products',
        {
          title,
          genre,
          boxArt,
          duration,
          rating,
          actors: actors.split(','),
          isKidFriendly,
          releaseYear,
        },
        { withCredentials: true },
      )
      .then((res) => {
        console.log(res.data);
        navigate('/');
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
      {errors.genre && <span className="text-danger">{errors.genre.message}</span>}
      <label>Box Art</label>
      <input type="text" value={boxArt} onChange={(e) => setBoxArt(e.target.value)} />
      {errors.boxArt && <span className="text-danger">{errors.boxArt.message}</span>}
      <label>Duration</label>
      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} />
      {errors.duration && <span className="text-danger">{errors.duration.message}</span>}
      <label>Rating</label>
      <select value={rating} name="rating" onChange={(e) => setRating(e.target.value)}>
        <option>Select a Rating</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="NC-17">NC-17</option>
      </select>
      {errors.rating && <span className="text-danger">{errors.rating.message}</span>}
      <label>Actors</label>
      <input
        type="text"
        value={actors}
        placeholder="enter actors with commas"
        onChange={(e) => setActors(e.target.value)}
      />
      {errors.actors && <span className="text-danger">{errors.actors.message}</span>}
      <label> Kid Friendly</label>
      <input
        type="checkbox"
        checked={isKidFriendly}
        onChange={(e) => setIsKidFriendly(e.target.checked)}
      />
      {errors.isKidFriendly && <span className="text-danger">{errors.isKidFriendly.message}</span>}
      <label> Release Year</label>
      <input type="number" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
      {errors.releaseYear && <span className="text-danger">{errors.releaseYear.message}</span>}
      <button>Add Product</button>
    </form>
  );
};

export default NewProduct;