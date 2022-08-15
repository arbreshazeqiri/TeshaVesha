import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const EditProduct = ({ isLoggedin, setIsLoggedin }) => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [delivery, setDelivery] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  let [images, setImages] = useState([]);
  let [names, setNames] = useState([]);
  const maxNumber = 4;
  let [img, setImg] = useState(0);
  const { id } = useParams();

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setNames(imageList.map(image => image.file.name));
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/current-user', { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setLocation(res.data.location);
        setCategory(res.data.category);
        setCondition(res.data.condition);
        setDelivery(res.data.delivery);
        setPrice(res.data.price);
      })
      .catch((err) => console.log('GET PRODUCT BY ID ERROR', err));
  }, [id, isLoggedin]);

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
    if (images.length > 0) {
      axios
        .put(
          `http://localhost:8000/api/products/${id}`, {
          title,
          description,
          location,
          category,
          condition,
          delivery,
          price,
          names,
        },
          { withCredentials: true },
        )
        .then((res) => {
          uploadImages();
          navigate('/profile/' + user.username);
        })
        .catch((err) => {
          setErrors(err.response.data.errors);
          console.log(err.response.data.errors);
        });
    }
    else {
      console.log("Upload at least one image.");
      setImg(1);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "0em" }}>
      <h4 style={{ margin: "0", marginRight: "26em", marginBottom: "0.5em" }}>LIST ITEM FOR SALE</h4>
      <div className="app-wrapper">
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
            }) => (
              <div className="upload__image-wrapper">
                {img === 1 ? <span className="text-danger" style={{ fontSize: "15px", marginTop: "-1.5em" }}>Upload between 1-4 images.</span>
                  : <span style={{ fontSize: "15px", marginTop: "-1.5em", color: "transparent" }}>Something</span>}
                <div className="row2">
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image['data_url']} />
                      <div className="image-item__btn-wrapper">
                        <button className="btn btn-primary" id="styled-button-two" style={{ width: "80px" }} onClick={() => onImageUpdate(index)}>Update</button>
                        <button className="btn btn-danger" id="styled-button-one" style={{ width: "80px" }} onClick={() => onImageRemove(index)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mainbtndiv">
                  <button className="btn btn-primary" id="styled-button-one"
                    style={{ width: "130px", height: "40px" }}
                    onClick={onImageUpload}
                  >
                    Upload images
                  </button>
                  <button className="btn btn-danger" id="styled-button-two" style={{ width: "160px", height: "40px" }} onClick={onImageRemoveAll}>Remove all images</button>
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
        {/* <button className="btn btn-primary" onClick={() => uploadimages()}>Submit Images</button> */}
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            {errors.title && <span className="text-danger">{errors.title.message}</span>}
            <label>Description</label>
            <textarea value={description} style={{ height: "40px" }} onChange={(e) => setDescription(e.target.value)} />
            {errors.description && <span className="text-danger">{errors.description.message}</span>}
            <label>Location</label>
            <select value={location} name="location" onChange={(e) => setLocation(e.target.value)}>
              <option value="">Select a location</option>
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
              <option value="">Select a category</option>
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
              <option value="">Select product condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="fairly used">Fairly used</option>
            </select>
            {errors.condition && <span className="text-danger">{errors.condition.message}</span>}
            <label>Delivery</label>
            <select value={delivery} name="delivery" onChange={(e) => setDelivery(e.target.value)}>
              <option value="">Select delivery method</option>
              <option value="my own shipping">My own Shipping</option>
              <option value="pick up">Pick up</option>
            </select>
            {errors.delivery && <span className="text-danger">{errors.delivery.message}</span>}
            <label>Price</label>
            <input type="number" value={price} placeholder="VALUE IN EURO (€)" onChange={(e) => setPrice(e.target.value.toString())} />
            {errors.price && <span className="text-danger">{errors.price.message}</span>}
            <button id="styled-button-one" style={{ width: "300px" }}>Update listing</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;