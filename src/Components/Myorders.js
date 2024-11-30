import React from 'react';

const Myorders = () => {
  // Sample orders data
  const orders = [
    {
      id: 1,
      date: '2024-11-02',
      total: 25.5,
      items: [
        { id: 1, name: 'Apple', price: 1.5, quantity: 5, image: 'apple.jpg' },
        { id: 2, name: 'Banana', price: 0.75, quantity: 10, image: 'banana.jpg' },
      ],
    },
    {
      id: 2,
      date: '2024-10-28',
      total: 15.0,
      items: [
        { id: 3, name: 'Orange', price: 1.0, quantity: 5, image: 'orange.jpg' },
        { id: 4, name: 'Grapes', price: 2.0, quantity: 3, image: 'grapes.jpg' },
      ],
    },
  ];

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
      fontWeight: 'bold',
    },
    itemDetails: {
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order.id} style={styles.orderContainer}>
          
          <div style={styles.orderHeader}>
            <span>Order Date: {order.date}</span>
            <span>Total: ${order.total.toFixed(2)}</span>
          </div>

          <div style={styles.orderDetails}>
            {order.items.map((item) => (
              <div key={item.id} style={styles.itemContainer}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  <div>
                    <p style={styles.itemName}>{item.name}</p>
                    <p style={styles.itemDetails}>
                      Quantity: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Myorders;
