import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const NewProduct = ({ isLoggedin, setIsLoggedin }) => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [delivery, setDelivery] = useState('');
  const [price, setPrice] = useState('');
  const [names, setNames] = useState([]);
  const [nameOne, setNameOne] = useState(null);
  const [nameTwo, setNameTwo] = useState('');
  const [nameThree, setNameThree] = useState('');
  const [nameFour, setNameFour] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let [images, setImages] = useState([]);
  const maxNumber = 5;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/current-user', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [isLoggedin]);

  const fillImgPaths = () => {
    for (var a = 0; a < images.length; a++) {
      const fd = new FormData();
      fd.append('image', images[a]['file']);
      names.push(images[a]['file']['name']);
      axios.post('http://localhost:8000/upload', fd
      ).then(res => {
        console.log("Image path(s) set successfully");
      });
    }
  }

  const uploadImages = () => {
    for (var a = 0; a < images.length; a++) {
      const fd = new FormData();
      fd.append('image', images[a]['file']);
      axios.post('http://localhost:8000/upload', fd
      ).then(res => {
        console.log("Images uploaded successfully");
      });
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    fillImgPaths();
    setNameOne(names[0]);
    setNameTwo(names[1]);
    setNameThree(names[2]);
    setNameFour(names[3]);
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
          nameOne,
          nameTwo,
          nameThree,
          nameFour,
        },
        { withCredentials: true },
      )
      .then((res) => {
        uploadImages();
        navigate('/profile/' + user.username);
      })
      .catch((err) => setErrors(err.response.data.errors));
  };

  return (
    <div className="App">
      <div className="uploaded-images">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <div className="mainbtndiv">
                <button className="btn btn-primary"
                  style={isDragging ? { color: 'red' } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>

                <button className="btn btn-danger" onClick={onImageRemoveAll}>Remove all images</button>
              </div>
              <div className="row2">
                {imageList.map((image, index) => (
                  <div key={index} className="image-item mt-5 mb-5 mr-5">
                    <img src={image['data_url']} />
                    <div className="image-item__btn-wrapper">
                      <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>Update</button>
                      <button className="btn btn-danger" onClick={() => onImageRemove(index)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              {!nameOne? <span className="text-danger">{'At least one product image is required.'}</span> : null}
            </div>
          )}
        </ImageUploading>
      </div>
      {/* <button className="btn btn-primary" onClick={() => uploadimages()}>Submit Images</button> */}
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
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
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value.toString())} />
        {errors.price && <span className="text-danger">{errors.price.message}</span>}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default NewProduct;