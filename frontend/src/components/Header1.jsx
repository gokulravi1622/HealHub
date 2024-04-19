// frontend/src/components/Header1.jsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import atc from '../assets/add-to-cart.png';

const Header1 = () => {
  
  return (
    <div className="container-fluid">
      <Navbar bg="light" variant="light" className="p-3" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">
            <Nav.Link href="/" className="px-20 text-black" style={{ fontSize: '1.5rem', paddingRight: '20px' }}>
              Heal Hub
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link href="#" className="px-2 text-black">
                Home
              </Nav.Link>
              <Nav.Link href="#" className="px-2 text-black">
                Features
              </Nav.Link>
              <Nav.Link href="#" className="px-2 text-black">
                Pricing
              </Nav.Link>
              <Nav.Link href="#" className="px-2 text-black">
                FAQs
              </Nav.Link>
              <Nav.Link href="#" className="px-2 text-black">
                About
              </Nav.Link>
            </Nav>
            <Form className="d-flex mb-3 mb-lg-0 me-lg-3">
              <FormControl
                type="search"
                placeholder="Search..."
                className="form-control-dark me-lg-3"
                aria-label="Search"
              />
            </Form>
            <div className="text-end">
              <Link to="/signin">
                <Button variant="light" className="me-2">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="success">Sign-up</Button>
              </Link>
            </div>
            <div style={{ marginLeft: '20px' }}>
              <Nav.Link href="#">
                <img src={atc} alt="Add to Cart" className="d-inline-block align-top" height="30" />
              </Nav.Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header1;
