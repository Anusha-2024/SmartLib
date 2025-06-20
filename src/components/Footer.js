import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'rgba(208, 2, 26, 0.66)', // more translucent red
      color: 'white',
      textAlign: 'center',
      padding: '15px 20px',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      height: '8px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      backdropFilter: 'blur(5px)'
    }}>
      &copy; {new Date().getFullYear()} SmartLib by Anusha. All rights reserved.
    </footer>
  );
};

export default Footer;
