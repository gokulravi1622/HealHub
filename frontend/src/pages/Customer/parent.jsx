import React, { useState } from 'react';
import BuyProduct from './BuyProduct';
import AddToCartPage from './AddToCartPage';

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div>
      <BuyProduct addToCart={addToCart} />
      <AddToCartPage cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default App;
