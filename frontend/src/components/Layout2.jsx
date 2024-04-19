//frontend/src/components/Layout2.jsx
import React, { useState } from 'react';
import Header2 from './Header2';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; // Import Outlet from react-router-dom

const Layout2 = () => {
    const [cartItems, setCartItems] = useState([]);

    // Define a function to add items to the cart
    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    }

    return (
        <>
            <Header2 cartItems={cartItems} /> {/* Pass cartItems as prop */}
            <Outlet /> {/* Render child routes */}
            <Footer />
        </>
    );
};

export default Layout2;
