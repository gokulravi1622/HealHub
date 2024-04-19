import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import atc from '../assets/add-to-cart.png';
import account from '../assets/account.png';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const Header2 = ({ cartItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(cartItems.reduce((total, item) => total + (item.quantity || 1), 0));
  }, [cartItems]);

  const handleLogout = () => {
    dispatch(logout());
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      navigate('/');
    }
  };

  return (
    <Navbar bg="light" variant="light" className="p-3" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/customer" className="text-black" style={{ fontSize: '1.5rem' }}>
          Heal Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/customer" className="text-black">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="./about" className="text-black">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="./buyproduct" className="text-black">
              Buy Products
            </Nav.Link>
            <Nav.Link as={Link} to="./category" className="text-black">
              Category
            </Nav.Link>
            
          </Nav>
          <Form className="d-flex mb-3 mb-lg-0 me-lg-3">
            <FormControl type="search" placeholder="Search..." className="form-control-dark" aria-label="Search" />
          </Form>
          <div className="text-end">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <img src={account} alt="Account" className="d-inline-block align-top" height="30" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="./profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="./changepass">
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="./Order">
                  Order
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex align-items-center">
            <Link to="./addtocart" className="position-relative">
              <img src={atc} alt="Add to Cart" className="d-inline-block align-top" height="30" />
              {cartItemCount > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 end-0 translate-middle">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header2;
