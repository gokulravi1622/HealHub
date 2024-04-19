import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch email from local storage when component mounts
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) {
      setFormData({ ...formData, email: email });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    setError('');

    try {
      const loginResponse = await axios.post('http://localhost:3000/api/user/login', {
        email: formData.email,
        password: formData.currentPassword
      });

      // Log login response
      console.log("Login response:", loginResponse);

      // If login is successful, proceed with updating the password
      if (loginResponse.status === 200) {
        const updateResponse = await axios.put(`http://localhost:3000/api/user/updatePasswordByEmail/${formData.email}`, formData);
        
        // Log update response
        console.log("Update response:", updateResponse);

        // Handle success, maybe show a success message to the user
        setShowSuccessModal(true);
      } else {
        // Handle login failure
        setError('Invalid credentials. Please check your current password.');
      }
    } catch (error) {
      // Log error
      console.error("Error updating password:", error);

      if (error.response && error.response.status === 401) {
        setError('Current password is incorrect.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Change Password</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCurrentPassword">
              <Form.Label>Current Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter current password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button variant="primary" type="submit">
              Update Password
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Password updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ChangePassword;
