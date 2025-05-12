import React, { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';
import uploadFiles from '../Helpers/Convertingfilephototolink'
function ProductAddingForm(props) {
  console.log(props.shop);
  const [formData, setFormData] = useState({
    productname: '',
    rating: '',
    offers: '',
    price: '',
    category: '',
    productpic: null,
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadphoto = await uploadFiles(file);

        if (uploadphoto && uploadphoto.url) {

          setFormData((prevData) => ({
            ...prevData,
            productpic: uploadphoto?.url
          }));

        } else {
          console.error("Upload returned no URL.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { ...formData, shopname: props.shop.name, email: props.shop.email }
    try {
      const base_url="https://grocerywebappbackend.onrender.com"
      const response = await fetch(`${base_url}/api/insertproduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      })
      const json = await response.json();
      alert(json.message);
      props.setproductadded(true);
      setFormData({
        productname: '',
        rating: '',
        offers: '',
        price: '',
        category: '',
        productpic: null,
      })

    } catch (error) {
      alert(error.message);
    }

  };

  const handleClose = () => {
    setIsOpen(false);
    props.setproductform(false);
  };

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,

    right: 0,
    bottom: 0,
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(1px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'left',
    position: 'relative',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <form onSubmit={handleSubmit}>
          <div style={{ cursor: 'pointer' }} onClick={handleClose}>
            <TiDeleteOutline color="red" size={30} />
          </div>
          <h2 style={{ marginBottom: '1em', fontSize: '1.5em', color: '#333' }}>Product Details</h2>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Product Name:
            <input
              type="text"
              name="productname"
              value={formData.productname}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }}
              required
            />
          </label>
          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }}
              required
            />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Product Rating:
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }}
              required
            />
          </label>



          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Offers:
            <input
              type="text"
              name="offers"
              value={formData.offers}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }}
              required
            />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }}
              required
            />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Profile Picture:
            <input
              type="file"
              name="productpic"
              onChange={handleFileInputChange}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }}
              required
            />
          </label>

          <button
            type="submit"
            style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductAddingForm;
