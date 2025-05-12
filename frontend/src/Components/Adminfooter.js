import React from 'react';

const AdminFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.text}>© 2024 Grocery Assistant. All rights reserved.</p>
        <div style={styles.links}>
          <a href="/privacy" style={styles.link}>Privacy Policy</a>
          <a href="/terms" style={styles.link}>Terms of Service</a>
          <a href="/contact" style={styles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

// Styles for the footer component
const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '1rem',
    position: 'relative',
    bottom: 0,
    width: '97%',
    textAlign: 'center',
  },
  content: {
    maxWidth: '90%',
    margin: '0 auto',
  },
  text: {
    margin: '0.5rem 0',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  link: {
    color: '#ff5722',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default AdminFooter;
