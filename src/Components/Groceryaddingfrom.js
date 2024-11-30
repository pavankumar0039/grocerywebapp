import React, { useState } from 'react';
import { TiDeleteOutline } from 'react-icons/ti';

function Groceryaddingfrom(props) {
  const [formData, setFormData] = useState({
    name: '',
    rating: '',
    address: '',
    openingHours: '',
    products: '',
    phone: '',
  });
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let email=localStorage.getItem('email');
    let data={...formData,accounttype:'Admin',email:email}
    try {
      const response = await fetch('http://localhost:4000/api/mastergrocerycreation', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      alert(json.message);
      if (json.success === true) {
        props.setgroceryshopinsert(true)
        setFormData({
          name: '',
          rating: '',
          address: '',
          openingHours: '',
          products: '',
          phone: '',
        })
      }
    } catch (error) {
      alert("failed to insert");
      console.log(error);

    }
    try {
      let email=localStorage.getItem('email');
      let data={...formData,accounttype:'Admin',email:email}
      const response = await fetch('http://localhost:4000/api/admingroceryshopcreation', {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const json = await response.json();
      alert(json.message);
      if (json.success === true) {
        props.setgroceryshopinsert(true)
        setFormData({
          name: '',
          rating: '',
          address: '',
          openingHours: '',
          products: '',
          phone: '',
        })
      }
    } catch (error) {
      alert("failed to insert");
      console.log(error);

    }
  };

  const handleClose = () => {
    setIsOpen(false);
    props.setgroceryform(false);
  };

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    backdropFilter: 'blur(1px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
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
        <form onSubmit={handleSubmit} >
          <div style={{ cursor: 'pointer' }} onClick={handleClose}>
            <TiDeleteOutline color="red" size={30} />
          </div>
          <h2 style={{ marginBottom: '1em', fontSize: '1.5em', color: '#333' }}>Grocery Shop Details</h2>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Grocery Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }} required />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Grocery Rating:
            <input type="number" name="rating" placeholder='eg:3 or 3.5' value={formData.rating} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }} required />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }} required />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Opening Hours:
            <input type="text" name="openingHours" placeholder='eg:9am to 10pm' value={formData.openingHours} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }} required />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Products:
            <textarea name="products" placeholder='dairy,veggies,cloths,etc...' value={formData.products} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em', height: '60px', resize: 'none' }} required />
          </label>

          <label style={{ marginBottom: '1em', fontWeight: 'bold', color: '#333' }}>
            Contact Number:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontSize: '1em', marginBottom: '1em' }} required />
          </label>

          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1em' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Groceryaddingfrom;
