import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from './Message';
import axios from 'axios';


const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        const copySignupInfo = { ...signupInfo }
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo)
    }
    console.log("signupinfo ->", signupInfo)

    const handleSignup = async (e) => {
        e.preventDefault();
        const { username, email, password, role } = signupInfo;
        if (!username || !email || !password || !role) {
            return handleError('Name,Email,Password & Role are required')
        }
        try {
            const url = `http://localhost:5000/api/register`;
            const { data } = await axios.post(url, signupInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                 withCredentials: true // Ensure this matches your backend's configuration
            });
            
            console.log("API Response:", data);

            if (data.success) {
                handleSuccess(data.message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }
            // const { success, message, error } = data;
            // if (success) {
            //     handleSuccess(message);
            //     setTimeout(() => {
            //         navigate('/login');
            //     }, 1000);
            // } else if (error) {
            //     // Display specific server validation errors
            //     const details = error?.details?.[0]?.message;
            //     handleError(details || message || 'An error occurred');
            // }
             else {
                handleError(message || 'An unexpected error occurred');
            }
           
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <Container className="signup-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="signup-form">
                        <h1 className="text-center">Signup Page</h1>
                        <Form onSubmit={handleSignup}>
                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    type="text"
                                    name="username"
                                    placeholder="Enter your username"
                                    value={signupInfo.username}
                                />
                            </Form.Group>

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={signupInfo.email}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    value={signupInfo.password}
                                />
                            </Form.Group>

                            <Form.Group controlId="formRole" className="mb-3">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="role"
                                    onChange={handleChange}
                                    value={signupInfo.role}
                                >
                                    <option value="">Select Role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Student">Student</option>
                                </Form.Control>
                            </Form.Group>


                            <Button variant="primary" type="submit" className="w-100">
                                Sign Up
                            </Button>
                        </Form>
                        <p className="text-center mt-3">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary">
                                Login
                            </Link>
                        </p>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default Signup