import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Modal, Row, Col } from 'react-bootstrap';

const Category = ({ addToCart, cartItems }) => {
    const [productsByType, setProductsByType] = useState([]);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    useEffect(() => {
        const fetchProductsByType = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/getAllProduct');
                setProductsByType(response.data);
            } catch (error) {
                setError('Error fetching products');
                console.error('Error fetching products:', error);
            }
        };
        fetchProductsByType();
    }, []);

    const handleAddToCart = (product) => {
        const isAlreadyInCart = cartItems.some((item) => item._id === product._id);
        if (!isAlreadyInCart) {
            addToCart(product);
            setCartItemCount(cartItemCount + 1);
        }
        setAddedToCart({ ...addedToCart, [product._id]: true });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Products</h2>
            {error && <p>{error}</p>}
            {productsByType.map((group) => (
                <div key={group._id} className="mb-4">
                    <h3>{group._id}</h3>
                    <Row className="justify-content-center">
                        {group.products.map((product) => (
                            <Col key={product._id} xs={12} sm={6} md={4} lg={3} xl={2} className="mb-3">
                                <div className="d-flex justify-content-center">
                                    <Card style={{ width: '18rem' }}>
                                        <div className="d-flex justify-content-center align-items-center" style={{ height: '180px' }}>
                                            <Card.Img variant="top" src={`http://localhost:3000/Images/${product.productImage}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{product.productName}</Card.Title>
                                            <Card.Text>{product.productDescription}</Card.Text>
                                            <Card.Text>Price: ${product.productPrice}</Card.Text>
                                            <Button variant="primary" onClick={() => handleAddToCart(product)} disabled={addedToCart[product._id] || cartItems.some(item => item._id === product._id)}>
                                                {cartItems.some(item => item._id === product._id) ? 'Already Added' : 'Add to Cart'}
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add to Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>Product added to cart.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Category;
