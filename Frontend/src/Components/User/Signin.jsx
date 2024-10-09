
import React, { useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Assuming a token is returned on successful login
                localStorage.setItem('token', data.token); // Store the token
                navigate('/dashboard'); // Redirect to the dashboard or home
            } else {
                setError(data.message || 'Failed to sign in');
            }
        } catch (err) {
            setError('An error occurred while signing in.');
        }
    };

    return (
        <div className="signin-page d-flex justify-content-center align-items-center">
            <Container className="signin-container">
                <Row>
                    <Col lg="6" md="6" sm="12" className="d-flex align-items-center justify-content-center">
                        <h1 className="signin-title">SIGN-IN</h1>
                        <div className="vertical-line"></div>
                    </Col>
                    <Col lg="6" md="6" sm="12" className="mx-auto">
                        <div className="form-container">
                            <div className="form registration-form">
                                <h2 className="form__title">Sign-in</h2>
                                {error && <p className="error-message">{error}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form__group">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="form__input"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form__input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="signin-btn">
                                        Sign In
                                    </button>
                                </form>
                                <p className="form__text">
                                    <Link to="/signup" className="redirect-link">
                                         Don't have an account? Signup
                                    </Link>
                                </p>
                                <p className="form__text">
                                    <Link to="/forgot-password" className="redirect-link">
                                        Forgot Password?
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

export default Signin;

