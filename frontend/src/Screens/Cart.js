import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ColorRing } from 'react-loader-spinner';
import { loadStripe } from '@stripe/stripe-js';
const Basket = () => {
  const user = useSelector((state) => state.user);
  const [basketItems, setBasketItems] = useState({});
  
  const gettingcartdetails = async () => {
    if (!user || !user.email) {
      console.error("User not logged in or email missing");
      return;
    }

    try {
      const base_url="http://localhost:4000"
      const response = await fetch(`${base_url}/api/gettingcartdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });

      const json = await response.json();
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
      console.error("Error fetching cart details:", error);
    }
  };

  const calculateSubtotal = () => {
    return Object.values(basketItems)
      .flat()
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const calculateSavings = () => {
    return Object.values(basketItems).flat().reduce((sum, item) => {
      return sum + (item.price * parseInt(item.offers)) / 100;
    }, 0);
  };

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
 
  const handleRemoveItem = async (category, productId) => {
        let data={email:user.email,productid:productId}
        const base_url="http://localhost:4000"
        console.log(data);
        try {
          const response=await fetch(`${base_url}/api/removefromcart`,  {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
  
          const json=await response.json();
          alert(json.message)
          gettingcartdetails()
          
        } catch (error) {
          console.log(error);
          
        }
       

  };

  useEffect(() => {
    gettingcartdetails();
  });




  const paynow = async () => {
    const stripe = await loadStripe("pk_test_51QNnaMRoSxuHwY1HNQFogTZbzm6dYjfCp9uUzpAadbjdp9lnGGBIvoJX2wxLFJY0u8rofC0DGl979szCASwOkgdw00RwfJj6QL")
    const allCartItems = Object.values(basketItems).flat();
    const base_url="http://localhost:4000"
    const response = await fetch(`${base_url}/api/checkoutsession`, {
      method: 'POST',
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(allCartItems)
    })
    const session = await response.json()
    
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    })
    if(result)
    {
      const handleCheckout = async () => {
        if (!user || !user.email) {
          alert("Please log in to proceed with checkout.");
          return;
        }

        const allCartItems = user.orderdetails;
        if (allCartItems.length === 0) {
          alert("Your cart is empty.");
          return;
        }

        try {
          const base_url="http://localhost:4000"
          const response = await fetch(`${base_url}/api/checkout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              cartItems: allCartItems,
            }),
          });

          const json = await response.json();
          if (response.ok) {
            alert(json.message || "Checkout successful!");
           
          } else {
            alert(json.error || "Something went wrong during checkout.");
          }
        } catch (error) {
          console.error("Checkout failed:", error);
          alert("Failed to process checkout. Please try again.");
        }
      };
     
      handleCheckout()
    }
    
   
     
    
    
    

  }
  const styles = {
    container: {
      width: "80%",
      margin: "auto",
      padding: "2rem",
    },
    heading: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textAlign: "left",
    },
    summaryContainer: {
      display: "flex",
      justifyContent: "space-between",
      padding: "1rem",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      marginBottom: "1.5rem",
    },
    productContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: "1rem",
      padding: "1rem",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#fff",
    },
    productImage: {
      width: "60px",
      height: "60px",
      marginRight: "1rem",
    },
    productDetails: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
      marginRight: "1rem",
    },
    quantityButton: {
      padding: "0.2rem 0.4rem",
      margin: "0 0.3rem",
      fontSize: "0.9rem",
      cursor: "pointer",
    },
    removeButton: {
      width: "6rem",
      padding: "0.4rem 0.8rem",
      fontSize: "0.9rem",
      backgroundColor: "#FF6347",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    subtotalText: {
      fontWeight: "bold",
      fontSize: "0.9rem",
      marginLeft: "1rem",
    },
    checkoutButton: {
      width: "7rem",
      height: "3rem",
      padding: "0.6rem 1.5rem",
      fontSize: "0.9rem",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Basket</h1>

      <div style={styles.summaryContainer}>
        <div>
          <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
          <p>Savings: ${calculateSavings().toFixed(2)}</p>
        </div>
        <button style={styles.checkoutButton} onClick={paynow}>
          PayNow
        </button>
      </div>

      {Object.keys(basketItems).length>0?(Object.keys(basketItems).map((category) => (
        <div key={category}>
          <h2>{category}</h2>
          {basketItems[category].map((product) => (
            <div style={styles.productContainer} key={product.id}>
              <img
                src={product.productpic}
                alt={product.name}
                style={styles.productImage}
              />
              <div style={styles.productDetails}>
                <h3>{product.productname}</h3>
                <p>Price: ${product.price}</p>
              </div>
              <div style={styles.quantityControl}>
                <button
                  style={styles.quantityButton}
                  onClick={() =>
                    handleQuantityChange(category, product.id, product.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  style={styles.quantityButton}
                  onClick={() =>
                    handleQuantityChange(category, product.id, product.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button
                style={styles.removeButton}
                onClick={() => handleRemoveItem(category, product._id)}
              >
                Remove
              </button>
              <p style={styles.subtotalText}>
                Subtotal: ${(parseInt(product.price) * parseInt(product.quantity)).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      ))):(<div style={{display:"flex",justifyContent:"center",width:"100%",alignItems:"center"}}><ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /></div>)}
    </div>
  );
};

export default Basket;
