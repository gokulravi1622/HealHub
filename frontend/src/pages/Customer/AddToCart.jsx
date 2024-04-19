import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51P6IGS083sUohJxxQ6MyIZmVoOt27nejRJDCa9oS8Se0bnMahOm4ZAnzDdrCZclaGBp3vK6mKcyzo0vjjdmVjuhI00LlH6kuCh';

const AddToCartPage = ({ cartItems, setCartItems }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [removedItemName, setRemovedItemName] = useState('');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
        zipCode: ''
    });
    const [addressSaved, setAddressSaved] = useState(false); // Track whether address is saved

    useEffect(() => {
        setTotalPrice(calculateTotalPrice());
    }, [cartItems]);

    function calculateTotalPrice() {
        return cartItems.reduce((total, item) => total + (item.productPrice * parseInt(item.quantity || 1)), 0);
    }

    const [orders, setOrders] = useState([]);

    const handleCheckout = async (email) => {
        try {
            if (!addressSaved) {
                setShowModal(true); // Show modal if address is not saved
                return; // Do not proceed to checkout
            }
            
            const updatedCartItems = cartItems.map(item => ({ ...item, orderStatus: "Pending" }));
            setCartItems(updatedCartItems);
            setOrders(updatedCartItems);

            const response = await axios.post(`http://localhost:3000/api/user/checkout/${email}`, { cartItems: updatedCartItems });
            const { sessionId } = response.data;
            const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error('Error during checkout:', error);
            } else {
                // Don't do anything here, let the success URL handle it
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    const removeFromCart = (index) => {
        const removedItem = cartItems[index];
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        setRemovedItemName(removedItem.productName);
        setShowModal(true);
    };

    const handleQuantityChange = (index, event) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = event.target.value;
        setCartItems(newCartItems);
    };

    const incrementQuantity = (index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].quantity = (newCartItems[index].quantity || 1) + 1;
        setCartItems(newCartItems);
    };

    const decrementQuantity = (index) => {
        const newCartItems = [...cartItems];
        if (newCartItems[index].quantity > 1) {
            newCartItems[index].quantity--;
            setCartItems(newCartItems);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const saveAddress = async () => {
        try {
            await axios.put(`http://localhost:3000/api/user/updateAddress/${localStorage.getItem('email')}`, { address });
            setAddressSaved(true); // Set addressSaved to true once the address is saved
            setShowModal(true); // Show modal confirming address saved
        } catch (error) {
            console.error('Error saving address:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.productName}</td>
                                        <td>{item.productDescription}</td>
                                        <td>${item.productPrice.toFixed(2)}</td>
                                        <td>
                                            <Button variant="outline-primary" size="sm" onClick={() => decrementQuantity(index)}>-</Button>{' '}
                                            <span>{item.quantity || 1}</span>
                                            <Button variant="outline-primary" size="sm" onClick={() => incrementQuantity(index)}>+</Button>
                                        </td>
                                        <td>${(item.productPrice * parseInt(item.quantity || 1)).toFixed(2)}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => removeFromCart(index)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>

                        <Form>
                            <Form.Group controlId="street">
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" name="street" value={address.street} onChange={handleAddressChange} />
                            </Form.Group>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" name="city" value={address.city} onChange={handleAddressChange} />
                            </Form.Group>
                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" name="state" value={address.state} onChange={handleAddressChange} />
                            </Form.Group>
                            <Form.Group controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control type="text" name="country" value={address.country} onChange={handleAddressChange} />
                            </Form.Group>
                            <Form.Group controlId="zipCode">
                                <Form.Label>ZipCode</Form.Label>
                                <Form.Control type="text" name="zipCode" value={address.zipCode} onChange={handleAddressChange} />
                            </Form.Group>
                            {/* Add other address fields similarly */}
                            <br />
                            <Button variant="primary" onClick={saveAddress}>
                                Save Address
                            </Button>
                        </Form>
                        <br />

                        <Button variant="success" onClick={() => handleCheckout(localStorage.getItem('email'))}>Checkout</Button>

                    </div>
                )}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{addressSaved ? "Address Saved" : "Enter Address"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{addressSaved ? "Your address has been saved." : "Please enter your address before proceeding to checkout."}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModal && !addressSaved} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please enter your address before proceeding to checkout.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AddToCartPage;
