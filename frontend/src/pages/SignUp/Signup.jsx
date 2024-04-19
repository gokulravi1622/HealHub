import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for routing
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Signup = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      mobile: formData.get('mobile'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };

    try {
      const response = await axios.post('http://localhost:3000/api/user/register', userData);
      setSuccessMessage('User registered successfully!');
      // You can optionally reset the form here if needed
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(error.response.data.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Container className="col-xl-10 col-xxl-8 px-4 py-5">
        <Row className="align-items-center g-lg-5 py-5">
          <Col md={10} lg={5} className="mx-auto">
            <Form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter first name" name="firstName" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lastName" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control type="tel" placeholder="Enter mobile number" name="mobile" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 btn-lg">
                Sign Up
              </Button>
              <hr className="my-4" />
              <small className="text-body-secondary">
                Already have an account? <Link to="/signin">Log in</Link>
              </small>
            </Form>
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
