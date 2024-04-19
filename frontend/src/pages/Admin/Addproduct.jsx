import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [type, setType] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // State to manage pop-up visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('productPrice', productPrice);
      formData.append('type', type);
      formData.append('productImage', productImage);

      const response = await axios.post('http://localhost:3000/api/user/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // You can handle the response accordingly
      setShowSuccess(true); // Show pop-up on success
    } catch (error) {
      setErrorMessage('Error adding product');
      console.error('Error adding product:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add Product</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control as="textarea" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Image</Form.Label>
          <Form.Control type="file" onChange={(e) => setProductImage(e.target.files[0])} />
        </Form.Group>
        <Button variant="primary" type="submit">Add Product</Button>
      </Form>

      {/* Pop-up for success */}
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Product Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your product has been successfully created.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccess(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddProduct;
