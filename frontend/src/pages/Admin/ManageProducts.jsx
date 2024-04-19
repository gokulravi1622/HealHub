import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

const ManageProducts = () => {
  const [usersCarts, setUsersCarts] = useState([]);

  useEffect(() => {
    const fetchUsersCarts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/getAllUsersCarts');
        setUsersCarts(response.data);
      } catch (error) {
        console.error('Error fetching users\' carts:', error);
      }
    };
    fetchUsersCarts();
  }, []);

  const handleApprove = async (email, itemIndex) => {
    try {
      const updatedCart = usersCarts.map((userCart) => {
        if (userCart.email === email) {
          const updatedItem = { ...userCart.cart[itemIndex], orderStatus: 'dispatched' };
          return {
            ...userCart,
            cart: [
              ...userCart.cart.slice(0, itemIndex),
              updatedItem,
              ...userCart.cart.slice(itemIndex + 1),
            ],
          };
        }
        return userCart;
      });

      await axios.put(`http://localhost:3000/api/user/updateUserCart/${email}`, {
        cartItems: updatedCart.find((userCart) => userCart.email === email).cart,
      });

      // Refresh the users' carts
      const response = await axios.get('http://localhost:3000/api/user/getAllUsersCarts');
      setUsersCarts(response.data);
    } catch (error) {
      console.error('Error approving order:', error);
    }
  };

  return (
    <div className="container">
      <h1>Manage Products</h1>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Cart</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {usersCarts.map((userCart) => (
              <tr key={userCart.email}>
                <td>{userCart.email}</td>
                <td>
                  <ul className="list-unstyled">
                    {userCart.cart.map((item, index) => (
                      <li key={`${item._id}-${index}`}>
                        <div>{item.productName}</div>
                        <div>{item.productDescription}</div>
                        <div>{item.productPrice}</div>
                        <div>{item.orderStatus}</div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  {userCart.cart.map((item, index) => (
                    <Button
                      key={`${item._id}-${index}`}
                      onClick={() => handleApprove(userCart.email, index)}
                      disabled={item.orderStatus === 'dispatched'}
                    >
                      Approve
                    </Button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageProducts;
