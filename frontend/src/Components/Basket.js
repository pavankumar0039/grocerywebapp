import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Basket = () => {
  let user = useSelector(state => state.user)
  const [basketItems, setBasketItems] = useState({});


  const gettingcartdetails = async () => {
    let data = { email: user.email }
    try {
      const response = await fetch("http://localhost:4000/api/gettingcartdetails", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let json = await response.json()
      alert(json.message)

      if (json.data) {
        
        const transformedBasketItems = json.data.reduce((acc, item) => {
          const { category, ...rest } = item; 
          if (!acc[category]) {
            acc[category] = []; 
          }
          acc[category].push(rest); 
          return acc;
        }, {});

        setBasketItems(transformedBasketItems);
      }
    } catch (error) {
      console.log(error)
    }
  }



  const calculateSubtotal = () => {
    return Object.values(basketItems)
      .flat()
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const calculateSavings = () => {

    return 2.0;
  };

  const subtotal = calculateSubtotal();
  const savings = calculateSavings();

  const handleQuantityChange = (category, productId, newQuantity) => {
    setBasketItems((prevItems) => {
      const updatedCategoryItems = prevItems[category].map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      );
      return { ...prevItems, [category]: updatedCategoryItems };
    });
  };

  useEffect(() => {
    gettingcartdetails();
  }, [])

  const styles = {
    container: {
      width: '80%',
      margin: 'auto',
      padding: '2rem',
    },
    heading: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      textAlign: 'left',
    },
    summaryContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '1.5rem',
    },
    productContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#fff',
    },
    productImage: {
      width: '60px',
      height: '60px',
      marginRight: '1rem',
    },
    productDetails: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    quantityControl: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '1rem',
    },
    quantityButton: {
      padding: '0.2rem 0.4rem',
      margin: '0 0.3rem',
      fontSize: '0.9rem',
      cursor: 'pointer',
    },
    subtotalText: {
      fontWeight: 'bold',
      fontSize: '0.9rem',
      marginLeft: '1rem',
    },
    checkoutButton: {
      width: '7rem',
      height: '3rem',
      padding: '0.6rem 1.5rem',
      fontSize: '0.9rem',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout');
  };

  return (
    <div style={styles.container}>

      <h1 style={styles.heading}>Your Basket</h1>


      <div style={styles.summaryContainer}>
        <div>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Savings: ${savings.toFixed(2)}</p>
        </div>
        <button style={styles.checkoutButton} onClick={handleCheckout}>
          Paynow
        </button>
      </div>

      {Object.keys(basketItems).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          {basketItems[category].map((product) => (
            <div style={styles.productContainer} key={product.id}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <div style={styles.productDetails}>
                <h3>{product.name}</h3>
                <p>Price: ${product.price.toFixed(2)}</p>
              </div>
              <div style={styles.quantityControl}>
                <button
                  style={styles.quantityButton}
                  onClick={() => handleQuantityChange(category, product.id, product.quantity - 1)}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  style={styles.quantityButton}
                  onClick={() => handleQuantityChange(category, product.id, product.quantity + 1)}
                >
                  +
                </button>
                <p style={styles.subtotalText}>
                  Subtotal: ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Basket;
