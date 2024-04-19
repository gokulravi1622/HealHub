import React, { useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Success = ({ }) => {
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <Alert variant="success">
            <Alert.Heading>Payment Successful!</Alert.Heading>
            <p>
              Thank you for your payment. Your transaction was successful.
            </p>
            <hr />
            <p className="mb-0">
              If you have any questions, feel free to contact us.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Success;
