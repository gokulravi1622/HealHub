//frontend/src/pages/Signin/Signin.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/authActions'; 

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3000/api/user/login', { email, password });
        console.log('Login response:', response.data); // Log the response data
        const { role } = response.data;
        await dispatch(login({ email, password }));
        console.log('Role:', role); // Log the role
        if (role === 'admin') {
            localStorage.setItem('email', email);
            navigate('/admin');
        } else {
            localStorage.setItem('email', email);
            navigate('/customer');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Unauthorized: Invalid email or password
            console.error('Invalid email or password');
        } else {
            // Other errors
            console.error('Login failed:', error.message);
        }
    }
};



    return (
        <div>
            <Container className="col-xl-10 col-xxl-8 px-4 py-5">
                <Row className="align-items-center g-lg-5 py-5">
                    <Col lg={7} className="text-center text-lg-start">
                        <h1 className="display-5 fw-bold lh-1 text-body-emphasis mb-3">Your health, your future – log in to manage your wellness journey!</h1>
                    </Col>
                    <Col md={10} lg={5} className="mx-auto">
                        <Form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="floatingInput">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="floatingPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3 form-check">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button variant="primary" type="submit" className="w-100 btn-lg">
                                Log in
                            </Button>
                            <hr className="my-4" />  <small className="text-body-secondary">If you don't have an account, <Link to="/signup">click here</Link> to Sign Up.</small>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signin;
