import React, { useRef, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
    return (
        <div className="signup-page d-flex justify-content-center align-items-center">
            <Container className="signup-container">
                <Row>
                    <Col lg="6" md="6" sm="12" className="d-flex align-items-center justify-content-center">
                        <h1 className="signup-title">SIGN-UP</h1>
                        <div className="vertical-line"></div>

                    </Col>
                    <Col lg="6" md="6" sm="12" className="mx-auto">
                        <div className="form-container">
                            <div className="form registration-form">
                                <h2 className="form__title">Sign-up</h2>
                                <form>
                                    <div className="form__group">
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form__input"
                                        />
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="form__input"
                                        />
                                    </div>
                                    <button type="submit" className="signup-btn">
                                        Sign In
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

