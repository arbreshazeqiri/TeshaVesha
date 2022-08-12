import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const NewProduct = ({ isLoggedin, setIsLoggedin }) => {
  // const [user, setUser] = useState(null);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [location, setLocation] = useState('');
  // const [category, setCategory] = useState('');
  // const [condition, setCondition] = useState('');
  // const [delivery, setDelivery] = useState('');
  // const [price, setPrice] = useState(0);
  // const [name, setName] = useState("");
  // const [img, setImg] = useState("");
  // const [errors, setErrors] = useState({});
  // const [selectedFile, setSelectedFile] = useState("");
  // const navigate = useNavigate();
  let [images, setImages] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);

    setImages(imageList);
  };
  const uploadimages = () => {
    for (var a = 0; a < images.length; a++) {
      const fd = new FormData();
      //console.log(images[a])
      fd.append('image', images[a]['file']);

      //Post Request to Nodejs API Route
      axios.post('http://localhost:8000/upload', fd
      ).then(res => {
        //Success Message in Sweetalert modal
        Swal.fire({
          title: 'Images hava been uploaded successfully.',
          text: "Thanks",
          type: 'success',

        });


      });
    }

  }

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:8000/api/current-user', { withCredentials: true })
  //     .then((res) => {
  //       setUser(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [isLoggedin,selectedFile, name]);

  // const submitForm = (e) => {
  // e.preventDefault();
  // const formData = new FormData();
  // formData.append("name", name);
  // formData.append("file", selectedFile);

  // axios.post('http://localhost:8000/upload', formData
  // ).then(res => {
  //   //Success Message in Sweetalert modal
  //   Swal.fire({
  //     title: 'Images hava been uploaded successfully.',
  //     text: "Thanks",
  //     type: 'success',

  //   });
  // });

  // axios
  //   .post(
  //     'http://localhost:8000/api/products',
  //     {
  //       // title,
  //       // description,
  //       // location,
  //       // category,
  //       // condition,
  //       // delivery,
  //       // price,
  //       name,
  //     },
  //     { withCredentials: true },
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //     // navigate('/profile/' + user.username);
  //   })
  //   .catch((err) => setErrors(err.response.data.errors));
  //};

  // return (
  // <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  //   <label>Title</label>
  //   <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
  //   {errors.title && <span className="text-danger">{errors.title.message}</span>}
  //   <label>Description</label>
  //   <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
  //   {errors.description && <span className="text-danger">{errors.description.message}</span>}
  //   <label>Location</label>
  //   <select value={location} name="location" onChange={(e) => setLocation(e.target.value)}>
  //     <option>Select a Location</option>
  //     <option value="Prishtinë">Prishtinë</option>
  //     <option value="Mitrovicë">Mitrovicë</option>
  //     <option value="Ferizaj">Ferizaj</option>
  //     <option value="Pejë">Pejë</option>
  //     <option value="Gjakovë">Gjakovë</option>
  //     <option value="Gjilan">Gjilan</option>
  //     <option value="Prizren">Prizren</option>
  //     <option value="Tiranë">Tiranë</option>
  //     <option value="Shkup">Shkup</option>
  //   </select>
  //   {errors.location && <span className="text-danger">{errors.location.message}</span>}
  //   <label>Category</label>
  //   <select value={category} name="category" onChange={(e) => setCategory(e.target.value)}>
  //     <option>Select a category</option>
  //     <option value="tops">Tops</option>
  //     <option value="bottoms">Bottoms</option>
  //     <option value="skirts">Skirts</option>
  //     <option value="jeans">Jeans</option>
  //     <option value="bags">Bags</option>
  //     <option value="glasses">Glasses</option>
  //     <option value="jewellery">Jewellery</option>
  //     <option value="shoes">Shoes</option>
  //     <option value="heels">Heels</option>
  //     <option value="sneakers">Sneakers</option>
  //   </select>
  //   {errors.category && <span className="text-danger">{errors.category.message}</span>}
  //   <label>Condition</label>
  //   <select value={condition} name="condition" onChange={(e) => setCondition(e.target.value)}>
  //     <option>Select product condition description</option>
  //     <option value="new">New</option>
  //     <option value="used">Used</option>
  //     <option value="fairly used">Fairly used</option>
  //   </select>
  //   {errors.condition && <span className="text-danger">{errors.condition.message}</span>}
  //   <label>Delivery</label>
  //   <select value={delivery} name="delivery" onChange={(e) => setDelivery(e.target.value)}>
  //     <option>Select delivery method</option>
  //     <option value="my own shipping">My own Shipping</option>
  //     <option value="pick up">Pick up</option>
  //   </select>
  //   {errors.delivery && <span className="text-danger">{errors.delivery.message}</span>}
  //   <label>Price</label>
  //   <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
  //   {errors.price && <span className="text-danger">{errors.price.message}</span>}
  {/* <input
        type="file"
        value={""}
        onChange={(e) => { setSelectedFile(e.target.files[0]); setImg(URL.createObjectURL(e.target.files[0])); setName(e.target.files[0].name) }} />
      <img src={img} alt="" /> */}
  {/* <button onClick={submitForm}>Submit</button> */ }

  {/*</form> */ }
  //   );
  // };

  return (
    <div className="App">

      <h1>Therichpost.com</h1>


      <div>
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
          )}
        </ImageUploading>
      </div>
      <button className="btn btn-primary" onClick={() => uploadimages()}>Submit Images</button>
    </div>
  );
};

export default NewProduct;