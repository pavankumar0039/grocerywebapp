import React, { useEffect, useState,useCallback } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminMain = (props) => {
  console.log(props.searchvalue)
  const [groceryShops, setGroceryShops] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [shopToEdit, setShopToEdit] = useState(null);
  const user = useSelector(state => state.user);
  console.log(user);
  const navigate = useNavigate();

  const clickedcard = (shop) => {
    props.setgroceryproduct(shop)
    navigate('/groceryshop', { state: { shop } });
  };


  const getdetailsofallgroceryshops = useCallback(async () => {
    let data = {
      email: localStorage.getItem('email')
    };
    const base_url = "https://grocerywebapp.onrender.com";
    let url =
      user.accounttype === "Admin"
        ? `${base_url}/api/admingrocerygetting`
        : `${base_url}/api/mastergrocerygetting`;
  
    let options =
      user.accounttype === "Admin"
        ? {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        : {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          };
    try {
      const response = await fetch(url, options);
      const jsondata = await response.json();
      if (jsondata.message === "Invalid or expired token. Please login again.") {
        alert(jsondata.message);
        setGroceryShops([]);
      } else {
        setGroceryShops(jsondata.data);
      }
    } catch (error) {
      alert("Failed to get grocery items");
      console.log("Failed to get grocery items");
    }
  }, [user.accounttype]);

  const Removefromgrocery = async (shop, e) => {
    e.stopPropagation();
    try {
      const base_url="https://grocerywebapp.onrender.com"
      const response = await fetch(`${base_url}/api/mastergrocerydeletion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          credentials: 'include',
        body: JSON.stringify(shop)
      });
      const json = await response.json();
      alert(json.message);
      getdetailsofallgroceryshops();
    } catch (error) {
      alert("Failed to remove grocery item");
      console.log(error);
    }

    try {
      let email = localStorage.getItem('email');
      let data = { ...shop, accounttype: 'Admin', email: email };
      const base_url="https://grocerywebapp.onrender.com"
      const response = await fetch(`${base_url}/api/admingroceryshopdeletion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          credentials: 'include',
        body: JSON.stringify(data)
      });
      const json = await response.json();
      alert(json.message);
      getdetailsofallgroceryshops();
    } catch (error) {
      alert("Failed to remove grocery item from admin list");
      console.log(error);
    }
  };

  const editgroceryshop = (shop) => {
    setShopToEdit(shop);
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    setShopToEdit({ ...shopToEdit, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    try {
      const base_url="https://grocerywebapp.onrender.com"
      const response = await fetch(`${base_url}/api/editmastergroceryshop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          credentials: 'include',
        body: JSON.stringify(shopToEdit)
      });
      const json = await response.json();
      alert(json.message);
      setEditMode(false);
      getdetailsofallgroceryshops();
    } catch (error) {
      alert("Failed to update grocery item");
      console.log(error);
    }
    try {
      let email = localStorage.getItem('email');
      let data = { ...shopToEdit, accounttype: 'Admin', email: email };
      const base_url="https://grocerywebapp.onrender.com"
      const response = await fetch(`${base_url}/api/editadmingroceryshop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          credentials: 'include',
        body: JSON.stringify(data)
      });
      const json = await response.json();
      alert(json.message);
      setEditMode(false);
      getdetailsofallgroceryshops();
    } catch (error) {
      alert("Failed to update grocery item");
      console.log(error);
    }
  };

  useEffect(() => {
    getdetailsofallgroceryshops();
  }, [props.groceryshopinsert,getdetailsofallgroceryshops]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Grocery Shops</h2>
      {editMode ? (
        <div style={styles.editForm}>
          <h3>Edit Grocery Shop</h3>
          <label>Name:</label>
          <input type="text" name="name" value={shopToEdit.name} onChange={handleEditChange} />
          <label>Address:</label>
          <input type="text" name="address" value={shopToEdit.address} onChange={handleEditChange} />
          <label>Phone:</label>
          <input type="text" name="phone" value={shopToEdit.phone} onChange={handleEditChange} />

          <label>Description:</label>
          <input type="text" name="description" value={shopToEdit.description} onChange={handleEditChange} />
          <label>Opening Hours:</label>
          <input type="text" name="openingHours" value={shopToEdit.openingHours} onChange={handleEditChange} />
          <label>Rating:</label>
          <input type="number" name="rating" value={shopToEdit.rating} onChange={handleEditChange} />
          <button onClick={saveChanges} style={styles.saveButton}>Save Changes</button>
          <button onClick={() => setEditMode(false)} style={styles.cancelButton}>Cancel</button>
        </div>
      ) : (
        Array.isArray(groceryShops) && groceryShops.length>0 ?(
        <div style={styles.cardContainer}>
          {groceryShops
            .filter((shop) => shop.name.toLowerCase().includes(props.searchvalue.toLowerCase()))
            .map((shop) => (
              <div key={shop._id} style={styles.card} onClick={() => clickedcard(shop)}>
                <h3 style={styles.shopName}>{shop.name}</h3>
                <p style={{ ...styles.rating, backgroundColor: '#e0f7fa' }}>
                  Rating: {shop.rating} ⭐
                </p>
                <p style={styles.address}>{shop.address}</p>
                <p style={styles.description}>{shop.description}</p>
                <p style={styles.openingHours}>
                  <strong>Opening Hours:</strong> {shop.openingHours}
                </p>
                <p style={styles.products}>
                  <strong style={styles.productHeading}>Products:</strong> {shop.products}
                </p>
                <p style={styles.contact}>
                  <strong style={styles.contactHeading}>Contact:</strong> {shop.phone}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {user.accounttype === 'Admin' && (
                    <FaRegEdit
                      size={25}
                      onClick={(e) => {
                        e.stopPropagation();
                        editgroceryshop(shop);
                      }}
                    />
                  )}
                  {user.accounttype === 'Admin' && (
                    <button
                      onClick={(e) => Removefromgrocery(shop, e)}
                      style={styles.addToCartButton}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>):(<div><p>please login</p></div>)
          

      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f0f0f0',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  shopName: {
    fontSize: '1.25rem',
    margin: '0.5rem 0',
  },
  rating: {
    fontSize: '1rem',
    color: '#333',
    padding: '0.5rem',
    borderRadius: '4px',
    margin: '0.5rem 0',
  },
  address: {
    fontSize: '0.9rem',
    color: '#777',
  },
  description: {
    fontSize: '0.9rem',
    color: '#333',
    marginTop: '0.5rem',
  },
  openingHours: {
    fontSize: '0.9rem',
    color: '#333',
    margin: '0.5rem 0',
  },
  contact: {
    fontSize: '0.9rem',
    color: '#333',
    margin: '0.5rem 0',
  },
  products: {
    fontSize: '0.9rem',
    color: '#333',
    margin: '0.5rem 0',
  },
  productHeading: {
    color: '#ff5722',
  },
  contactHeading: {
    color: '#ff5722',
  },
  addToCartButton: {
    backgroundColor: '#ff5722',
    color: '#fff',
    padding: '0.3rem 0.6rem',
    fontSize: '0.8rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '0.5rem 0.5rem 0 0.5rem',
  },


  editForm: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',

    marginTop: '1rem',
  }

};

export default AdminMain;
