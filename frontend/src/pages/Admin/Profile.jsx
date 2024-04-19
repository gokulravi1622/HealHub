import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobile: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            axios.get(`http://localhost:3000/api/user/getUserByEmail/${email}`)
                .then(response => setUser(response.data))
                .catch(error => console.error('Error fetching user:', error));
        }
    }, []);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const email = localStorage.getItem('email');
        try {
            await axios.put(`http://localhost:3000/api/user/updateUser/${email}`, formData);
            // Fetch user details again after update
            axios.get(`http://localhost:3000/api/user/getUserByEmail/${email}`)
                .then(response => {
                    setUser(response.data);
                    setShowSuccessModal(true);
                    setIsEditing(false);
                })
                .catch(error => console.error('Error fetching user:', error));
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user details.');
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="mb-4">User Profile</h2>
            {user ? (
                <Card>
                    <Card.Body>
                        {!isEditing ? (
                            <>
                                <div>
                                    <label>First Name:</label>
                                    <span>{user.firstName}</span>
                                </div>
                                <div>
                                    <label>Last Name:</label>
                                    <span>{user.lastName}</span>
                                </div>
                                <div>
                                    <label>Mobile:</label>
                                    <span>{user.mobile}</span>
                                </div>
                                <Button variant="primary" onClick={handleEditClick}>
                                    Edit
                                </Button>
                            </>
                        ) : (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formMobile">
                                    <Form.Label>Mobile:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter mobile number"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                                <Button variant="secondary" onClick={handleCancelClick} className="ml-2">
                                    Cancel
                                </Button>
                            </Form>
                        )}
                        <div className="mt-3">
                            <label>Email:</label>
                            <span>{user.email}</span>
                        </div>
                        <div>
                            <label>Role:</label>
                            <span>{user.role}</span>
                        </div>
                    </Card.Body>
                </Card>
            ) : (
                <p>Loading...</p>
            )}

            {/* Success Modal */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>User details updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Profile;
