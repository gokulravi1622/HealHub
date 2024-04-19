import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/nav.png';
import home1 from '../../assets/home1.png';


const Loggenin = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <img className="d-block mx-auto mb-4" src={logo} alt="" width="160" height="150" />
      <h1 className="display-5 fw-bold text-body-emphasis">Heal Hub</h1>
      <h6 className="display-7  text-body-emphasis">Your Wellness, Delivered</h6>

      <Container>
        <Row>
          <Col lg={6} className="mx-auto">
            <p className="lead mb-4">We prioritize your health and wellness, offering expert advice and guidance on medication usage, dosage, and potential interactions. Our team of pharmacists is dedicated to ensuring that you have access to the information you need to make informed decisions about your health.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="col-xxl-8 px-4 py-5">
      <Row className="flex-lg-row-reverse align-items-center g-5 py-5">
        <Col xs={10} sm={8} lg={6}>
          <img src={home1} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
        </Col>
        <Col lg={6}>
          <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">Responsive left-aligned hero with image</h1>
          <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default Loggenin
