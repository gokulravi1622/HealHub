import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSendClick = () => {
    if (!email.trim()) {
      alert('Please enter an email address.');
    } else {
      alert('Our team will contact you in the next 24 hours.');
      setEmail('');
    }
  };

  return (
    <Container>
      <footer className="py-5">
        <Row>
          <Col md={4} className="mb-3">
            <h5>About Heal Hub</h5>
            <p>Heal Hub is dedicated to providing the best healthcare solutions to our customers.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Important Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Category</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
              <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact Information</h5>
            <p>For any queries, please contact us:</p>
            <p>Phone: 123-456-7890</p>
            <p>Email: info@healhub.com</p>
            <p>Address: 123 Street, City, Country</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <h5>Facing issues?</h5>
              <p>Our customer team is waiting to help you</p>
              <div className="d-flex flex-column flex-sm-row gap-2 align-items-center">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ maxWidth: '100%' }}
                />
                <Button variant="success" onClick={handleSendClick}>Send</Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row className="border-top py-4 my-4">
          <Col>
            <p>© 2024 Heal Hub, Inc. All rights reserved.</p>
          </Col>
          <Col>
            <ul className="list-unstyled d-flex justify-content-end">
              <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
              <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
              <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
            </ul>
          </Col>
        </Row>
      </footer>
    </Container>
  );
};

export default Footer;
