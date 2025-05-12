import React, { useEffect, useState, useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SliderComponent from './SliderComponent';
import { FaRegEdit } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';
const restaurantImages = [
  '/images/istockphoto-2158766741-612x612.jpg',
  'https://via.placeholder.com/400x200?text=Restaurant+2',
  'https://via.placeholder.com/400x200?text=Restaurant+3',
];

const AdminUserRestaurant = (props) => {
  const { shop, setproductadded } = props;
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let [productsByCategory, setproductsByCategory] = useState([{}]);
  let [productremoved, setproductremoved] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const getproductsdata = useCallback(async () => {
    try {
      const base_url = "https://grocerywebappbackend.onrender.com";
      const response = await fetch(`${base_url}/api/admingettingproducts`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(shop)  // Using destructured shop here
      });
      const json = await response.json();
      const products = json.data;

      const categorizedProducts = products.reduce((acc, product) => {
        const { category, ...rest } = product;
        if (!acc[category]) acc[category] = [];
        acc[category].push(rest);
        return acc;
      }, {});

      setproductsByCategory(categorizedProducts);
      // alert("successfully fetched products data");

    } catch (error) {
      alert("Failed to get product items");
      console.log(error);
    }
  }, [shop]);

  const handlesubmited = async (editProduct) => {
    let data = {
      ...editProduct,
      shopname: shop.name
    };
    try {
      const base_url = "https://grocerywebappbackend.onrender.com";
      const response = await fetch(`${base_url}/api/adminupdatingproducts`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const json = await response.json();
      alert(json.message);
      setproductadded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getproductsdata();
    setproductremoved(false);
    setproductadded(false);
  }, [productremoved, setproductadded, getproductsdata]);  // Update dependency array

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Restaurant Name</h1>

      {/* Carousel for restaurant images */}
      <Slider {...sliderSettings} style={styles.carousel}>
        {restaurantImages.map((image, index) => (
          <div key={index} style={styles.slide}>
            <img src={image} alt={`Restaurant ${index + 1}`} style={styles.carouselImage} />
          </div>
        ))}
      </Slider>
      <SliderComponent />

      {/* Product catalog categorized */}

      <div className='catprocontainer' style={styles.catprocontainer}>
        <div style={styles.catcontainer}>
          {(Object.entries(productsByCategory).map(([category]) => (
            <div>
              <p style={styles.catpara}>{category}</p>
            </div>
          )))}
        </div>
        <div>
          {Object.entries(productsByCategory).length > 0 ? (Object.entries(productsByCategory).map(([category, products]) => (
            <div key={category} style={styles.categorySection}>
              <h2 style={styles.categoryHeading}>{category}</h2>
              <div style={styles.productCatalog}>
                {Array.isArray(products) &&
                  products
                    .filter((product) =>
                      product.productname.toLowerCase().includes(props.searchvalue.toLowerCase())
                    )
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        category={category}
                        shop={props.shop}
                        setproductremoved={setproductremoved}
                        setEditproduct={setEditProduct}
                      />
                    ))}
              </div>
            </div>
          ))) : (<div style={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}><ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          /></div>)}
        </div>

      </div>

      {/* Edit Form Modal */}
      {editProduct && (
        <div style={styles.editModal}>
          <div style={styles.editFormContainer}>
            <button style={styles.closeButton} onClick={() => setEditProduct(null)}>✖</button>
            <h2>Edit Product</h2>
            <form>
              <label style={styles.formLabel}>Product Name:</label>
              <input
                type="text"
                value={editProduct.productname}
                onChange={(e) => setEditProduct({ ...editProduct, productname: e.target.value })}
                style={styles.formInput}
              />
              <label style={styles.formLabel}>Price:</label>
              <input
                type="number"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                style={styles.formInput}
              />
              <label style={styles.formLabel}>Offers:</label>
              <input
                type="number"
                value={editProduct.offers}
                onChange={(e) => setEditProduct({ ...editProduct, offers: e.target.value })}
                style={styles.formInput}
              />
              <label style={styles.formLabel}>Rating:</label>
              <input
                type="number"
                value={editProduct.rating}
                onChange={(e) => setEditProduct({ ...editProduct, rating: e.target.value })}
                style={styles.formInput}
              />
              <button type="button" style={styles.saveButton} onClick={(e) => { handlesubmited(editProduct) }}>Save Changes</button>
            </form>
          </div>
        </div>
      )}

    </div>

  );
};

const ProductCard = ({ product, shop, setproductremoved, setEditproduct, category }) => {
  const [quantity, setQuantity] = useState(1);
  let user = useSelector(state => state.user)
  const handleAddToRemove = async (product) => {
    let data = {
      shopname: shop.name
    }
    try {
      const base_url = "https://grocerywebappbackend.onrender.com"
      const response = await fetch(`${base_url}/api/adminremovingproducts?productId=${product._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

      })
      const json = await response.json();
      alert(json.message);
      setproductremoved(true);
    } catch (error) {
      console.log(error);

    }
  };
  const handleAddToCart = async (product, category) => {
    let data = { ...product, email: user.email, category, quantity }
    console.log(data);
    try {
      const base_url = "https://grocerywebappbackend.onrender.com"
      const response = await fetch(`${base_url}/api/addtocart`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let json = await response.json()
      alert(json.message)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div style={styles.productCard}>
      <img src={product.productpic} alt={product.name} style={styles.productImage} />
      <div className='offercontainer' style={{ width: '3rem', height: '1.5rem', position: 'absolute', backgroundColor: 'green', top: '1rem', borderRadius: '0px 0px 5px 0px', color: 'white', fontSize: '12px', paddingTop: '7px' }}>
        {product.offers}%off
      </div>
      <h1 style={styles.productName}>{product.productname}</h1>
      <div className='product price' style={{ display: 'flex' }}>
        <p style={{ ...styles.productCost, fontSize: '20px', margin: '0px', padding: '0px' }}>{(parseInt(product.price) - (parseInt(product.price) * parseInt(product.offers) / 100)).toString()}
        </p>
        <p style={{ ...styles.productCost, fontSize: '15px', marginLeft: '5px', padding: '0px', color: 'grey', textDecoration: 'line-through' }} >{product.price}$</p>
      </div>

      <div style={styles.detailsContainer}>
        <p style={styles.productRating}>Rating: <span style={styles.ratingValue}>{product.rating} ★</span></p>
        <div style={styles.quantityContainer}>
          <label style={styles.quantityLabel}>Qty:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={styles.quantityInput}
          />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {user.accounttype === 'Admin' && <FaRegEdit size={23} style={{ cursor: 'pointer' }} onClick={() => setEditproduct(product)} />}
        {user.accounttype === 'Admin' && <button onClick={(e) => { handleAddToRemove(product) }} style={styles.addToCartButton}>Remove</button>}
        {user.accounttype === 'User' && <button onClick={(e) => { handleAddToCart(product, category) }} style={styles.addToCartButton}>Add to cart</button>}
      </div>
    </div>
  );
};

// Updated styles with the requested changes
const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333',
  },
  carousel: {
    marginBottom: '2rem',
  },
  slide: {
    padding: '0 10px',
  },
  carouselImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  categorySection: {
    marginBottom: '2rem',
  },
  categoryHeading: {
    fontSize: '1.5rem',
    color: '#555',
    marginBottom: '1rem',
  },
  productCatalog: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    justifyContent: 'space-around',
  },
  productCard: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    padding: '1rem',
    textAlign: 'center',
    width: '220px',
    height: 'auto', // Adjusted for better layout
  },
  productImage: {
    margin: '0px',
    padding: '0px',
    width: '100%', // Increased width
    height: '150px', // Decreased height
    borderRadius: '4px',
    marginBottom: '0.5rem',
  },
  productName: {

    padding: '0px',
    fontSize: '1rem',
    margin: '0rem 0',
    color: '#333',
  },
  productCost: {
    margin: '0px',
    padding: '0px',
    fontSize: '1.1rem',
    color: '#007BFF',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0px',
  },
  productRating: {
    margin: '0px',
    padding: '0px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333', // Color for the rating label
  },
  ratingValue: {
    margin: '0px',
    padding: '0px',
    color: '#ff5722', // Color for the rating value
  },
  quantityContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: '0.9rem',
    marginRight: '0.25rem',
    color: '#555',
    fontWeight: 'bold',
  },
  quantityInput: {
    width: '40px',
    padding: '0.25rem',
    textAlign: 'center',
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
  editModal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
  },
  editFormContainer: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    width: '2rem',
    height: '2rem',
    color: 'red',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
  },
  formLabel: {
    display: 'block',
    margin: '0.5rem 0',
  },
  formInput: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  mainContent: {
    display: 'flex',
  },
  sidebar: {
    width: '20%',
    backgroundColor: '#f5f5f5',
    padding: '1rem',
    borderRight: '1px solid #ddd',
  },
  sidebarHeading: {
    marginBottom: '1rem',
    fontSize: '1.2rem',
    color: '#333',
  },
  categoryList: {
    listStyle: 'none',
    padding: 0,
  },
  categoryItem: {
    padding: '0.5rem',
    cursor: 'pointer',
    color: '#007bff',
  },
  productContent: {
    width: '80%',
    padding: '1rem',
  },
  catprocontainer: {
    marginTop:"5rem",
   
  position:"relative"
  },
  catcontainer: {
    width: "15rem",
    height:"10rem",
    position:"fixed",
    zIndex:'1000',
   
    left:'0',
    
    backgroundColor: "white"
  },
  catpara:{
    textAlign:"center",
    fontSize:"1.5rem",
    fontWeight:"500"
  }
  

};

export default AdminUserRestaurant;
