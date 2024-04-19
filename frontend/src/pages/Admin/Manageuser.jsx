import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/user/getAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/user/deleteUser/${userId}`);
        // After successful deletion, fetch updated user list
        fetchUsers();
        setShowDeleteModal(true);
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Error deleting user');
      }
    }
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      {error && <div>Error: {error}</div>}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== 'admin' && (
                  <Button variant="danger" onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Deleted Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The user has been successfully deleted.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageUser;
