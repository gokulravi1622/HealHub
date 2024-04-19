import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Orders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email'); // Replace with the user's email

    // Fetch cart information based on user's email
    axios.get(`http://localhost:3000/api/user/getCartByEmail/${email}`)
      .then(response => {
        setCartItems(response.data.cart);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-responsive">
      <h2>Orders</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Order status</th>
            <th>Payment</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.productDescription}</td>
              <td>{item.productPrice}</td>
              <td>{item.orderStatus}</td>
              <td>Successful</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Orders;
