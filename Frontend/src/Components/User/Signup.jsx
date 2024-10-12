import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!/^[a-zA-Z\s]+$/.test(formData.username)) {
            newErrors.username = "Full Name must contain only letters and spaces.";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email must follow the correct email format.";
        }
        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3000/api/user/register', formData);
                console.log(response);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
                setErrors({});
            } catch (error) {
                console.error("There was an error registering the user:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="signup-page d-flex justify-content-center align-items-center">
            <Container className="signup-container">
                <Row>
                    <Col
                        lg="6" 
                        className="Side-section d-none d-md-flex align-items-center justify-content-center" 
                    >
                        <h1 className="signup-title">SIGN-UP</h1>
                        <div className="vertical-line"></div>
                    </Col>

                    <Col lg="6" md="6" sm="12" className="mx-auto">
                        <div className="form-container">
                            <div className="form registration-form">
                                <h2 className="form__title">Sign-up</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form__group">
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Full Name"
                                            className="form__input"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                        />
                                        {errors.username && <span className="error">{errors.username}</span>}
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className="form__input"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                        {errors.email && <span className="error">{errors.email}</span>}
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className="form__input"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                        />
                                        {errors.password && <span className="error">{errors.password}</span>}
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm Password"
                                            className="form__input"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                        />
                                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                                    </div>
                                    <button type="submit" className="signup-btn">
                                        Sign Up
                                    </button>
                                </form>
                                <p className="form__text">
                                    <Link to="/signin" className="redirect-link">
                                        Already have an account? Login
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
