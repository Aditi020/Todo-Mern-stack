import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({}); // To store validation errors

    const validateForm = () => {
        const newErrors = {};
        // Full Name validation (must contain only letters and spaces)
        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
            newErrors.fullName = "Full Name must contain only letters and spaces.";
        }
        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Email must follow the correct email format.";
        }
        // Password validation (simple criteria: at least 6 characters)
        if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }
        // Confirm Password validation
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        const validationErrors = validateForm();
        console.log("Validation Errors: ", validationErrors); // Debugging line
        if (Object.keys(validationErrors).length === 0) {
            // Submit the form if there are no validation errors
            console.log("Form submitted successfully");
            // You can add the API call for signup here
        } else {
            setErrors(validationErrors); // Update state with validation errors
        }
    };

    return (
        <div className="signup-page d-flex justify-content-center align-items-center">
            <Container className="signup-container">
                <Row>
                    <Col lg="6" md="6" sm="12" className="d-flex align-items-center justify-content-center hide-on-small-screen">
                        <h1 className="signin-title">SIGN-UP</h1>
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
                                            placeholder="Full Name"
                                            className="form__input"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        {errors.fullName && <span className="error">{errors.fullName}</span>}
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form__input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors.email && <span className="error">{errors.email}</span>}
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form__input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {errors.password && <span className="error">{errors.password}</span>}
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="form__input"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
