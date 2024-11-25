import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from './Message';
import axios from 'axios';


const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        const copyloginInfo = { ...loginInfo }
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo)
    }
    console.log("loginInfo ->", loginInfo)

    const handleLogin = async (e) => {
        e.preventDefault();
        const {  email, password } = loginInfo;
        if ( !email || !password ) {
            return handleError('Email & Password  are required')
        }
        try {
            const url = `http://localhost:5000/api/login`;
            const response = await axios.post(url, loginInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                 withCredentials: true // Ensure this matches your backend's configuration
            });
            const { role } = response.data.token && JSON.parse(atob(response.data.token.split('.')[1]));
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('logedInUser', response.data.name); 

            console.log("API Response:", response);
            console.log(role)

            if (role === 'Student') {
                handleSuccess(response.data.message);
                setTimeout(() => {
                    navigate('/student')
                }, 1000)
            } else if (role === 'Admin') {
                handleSuccess(response.data.message);
                setTimeout(() => {
                    navigate('/admin')
                }, 1000)
            } else {
                handleError('An invalid Email or Password')
            }

            // if (data.success) {
            //     handleSuccess(data.message);
            //     setTimeout(() => {
            //         navigate('/home')
            //     }, 1000)
            // }
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
            // } else {
            //     handleError(message || 'An unexpected error occurred');
            // }
           
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <Container className="signup-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="signup-form">
                        <h1 className="text-center">Login Page</h1>
                        <Form onSubmit={handleLogin}>
                            

                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={loginInfo.email}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    value={loginInfo.password}
                                />
                            </Form.Group>


                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                        <p className="text-center mt-3">
                            Dont have an account?{' '}
                            <Link to="/" className="text-primary">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default Login