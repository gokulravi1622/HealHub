import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
  const [location, setLocation] = useState('');

  const handleJoin = () => {
    setShowJoinModal(true);
  };

  const handleCloseJoin = () => {
    setShowJoinModal(false);
  };

  const handleJoinTeam = () => {
    setShowJoinTeamModal(true);
  };

  const handleCloseJoinTeam = () => {
    setShowJoinTeamModal(false);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    setShowJoinTeamModal(false);
    // Send location data to backend or handle it as needed
    // Here, we just display a confirmation message
    alert(`Thank you for your interest in joining our team! You will receive further information via email.`);
  };

  return (
    <Container className="mt-5">
      {/* About HealHub */}
      <Row>
        <Col>
          <h2>About HealHub</h2>
          <p>Welcome to HealHub, your trusted partner in health and wellness. At HealHub, we're committed to revolutionizing the way you approach healthcare by providing innovative solutions and personalized experiences tailored to your unique needs.</p>
          <p>Our journey began with a simple yet powerful vision: to empower individuals to take control of their health journey, leading to happier, healthier lives. Whether you're seeking information, connecting with healthcare professionals, or managing your wellness routine, HealHub is here to support you every step of the way.</p>
          <p>What sets us apart is our unwavering dedication to excellence and integrity. We believe in transparency, reliability, and the highest standards of quality in everything we do. From our user-friendly interface to our carefully curated content, we strive to ensure that your experience with HealHub is nothing short of exceptional.</p>
          <p>But HealHub is more than just a platform—it's a community. We're proud to bring together individuals, caregivers, and healthcare providers in a collaborative environment where knowledge is shared, questions are answered, and support is readily available.</p>
          <p>Whether you're embarking on a new health journey or seeking guidance on your existing path, HealHub is here to be your trusted companion. Join us today and discover a world of possibilities for a healthier tomorrow.</p>
          <p>Together, let's make every step towards wellness a meaningful one.</p>
          <Button variant="primary" onClick={handleJoin}>Join HealHub</Button>
        </Col>
      </Row>

      {/* Mission, Core Values, and Join Our Team */}
      <Row className="mt-5">
        <Col>
          <h3>Mission and Vision</h3>
          <p>Our mission is to empower individuals to take control of their health journey and lead happier, healthier lives. We envision a world where accessing high-quality healthcare information and services is simple, personalized, and empowering.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Core Values</h3>
          <ul>
            <li>Empathy</li>
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Community</li>
            <li>Excellence</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Our Team</h3>
          <p>Meet the passionate individuals behind HealHub who are dedicated to making a positive impact on global healthcare.</p>
          <Button variant="outline-primary" onClick={handleJoinTeam}>Join Our Team</Button>
        </Col>
      </Row>

      {/* Testimonials and Future Roadmap */}
      <Row className="mt-5">
        <Col>
          <h3>User Testimonials</h3>
          <p>Discover how HealHub has transformed the lives of our users.</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Future Roadmap</h3>
          <p>Explore our exciting plans and upcoming features.</p>
        </Col>
      </Row>

      {/* Modals */}
      {/* Join HealHub Modal */}
      <Modal show={showJoinModal} onHide={handleCloseJoin}>
        <Modal.Header closeButton>
          <Modal.Title>Thank You!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for showing your interest in HealHub! Our team will contact you with further information.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseJoin}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Join Our Team Modal */}
      <Modal show={showJoinTeamModal} onHide={handleCloseJoinTeam}>
        <Modal.Header closeButton>
          <Modal.Title>Join Our Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLocationSubmit}>
            <Form.Group controlId="formLocation">
              <Form.Label>Where are you located?</Form.Label>
              <Form.Control type="text" placeholder="Enter your location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default About;
