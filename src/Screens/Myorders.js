import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function convertToOrderFormat(data) {
  let orders = {};

  for (let item of data) {
    let dateTime = item.date;
    let [date, time] = dateTime.split('T');
    let [hours, minutes] = time.split(':');

    let key = date + " and " + hours + ":" + minutes;

    if (!orders[key]) {
      orders[key] = [];
    }

    orders[key].push(item);
  }

  return Object.entries(orders).map(([key, items]) => ({
    dateTime: key,
    items,
  }));
}

const MyOrders = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const base_url="https://grocerywebapp.onrender.com"
      const response = await fetch(`${base_url}/api/gettingorderdetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      const json = await response.json();
      setOrders(convertToOrderFormat(json.data));
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    container: {
      width: '80%',
      margin: 'auto',
      padding: '2rem',
    },
    orderContainer: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: '#f9f9f9',
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      fontWeight: 'bold',
    },
    orderDetails: {
      marginTop: '0.5rem',
      paddingLeft: '1rem',
    },
    itemContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      borderBottom: '1px solid #ddd',
    },
    itemImage: {
      width: '50px',
      height: '50px',
      marginRight: '1rem',
      borderRadius: '4px',
    },
    itemName: {
      margin:'0',
      padding:'0',
      fontWeight: 'bold',
    },
    itemDetails: {
      margin:'0',
      padding:'0',     
      fontSize: '0.9rem',
    },
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Order History</h1>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} style={styles.orderContainer}>
            <div style={styles.orderHeader}>
              <span>Order Date and Time: {order.dateTime}</span>
            </div>
            <div style={styles.orderDetails}>
              {order.items.map((item, idx) => (
                <div key={idx} style={styles.itemContainer}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.productpic} alt={item.name} style={styles.itemImage} />
                    <div>
                      <p style={styles.itemName}>{item.productname}</p>
                      <p style={styles.itemName}>${parseFloat(item.price).toFixed(2)}</p>
                      <p style={styles.itemDetails}>
                        Quantity: {item.quantity} 
                      </p>
                    </div>
                  </div>
                  <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
