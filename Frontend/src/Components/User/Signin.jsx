import React, { useState, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import './Signin.css';

const Signin = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) && identifier.length < 3) {
            errors.identifier = 'Please enter a valid email address or username (at least 3 characters).';
        }
        if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters long.';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        setFormErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://localhost:3000/api/user/login', {
                    identifier,
                    password,
                });

                const data = response.data;

                if (response.status === 200) {
                    localStorage.setItem('token', data.token); // Store the token

                    // Set showToast to true to trigger toast notification
                    setShowToast(true);

                    // Wait for 3 seconds before redirecting to the home page
                    setTimeout(() => {
                        navigate('/home');
                    }, 3000); // Redirect after 3000 milliseconds (3 seconds)
                } else {
                    setError(data.message || 'Failed to sign in');
                }
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred while signing in.');
            }
        }
    };

    useEffect(() => {
        if (showToast) {
            toast.success("Welcome to QuicList!", {
                position: "top-right",
                autoClose: 2000, // Toast will automatically close after 3000 milliseconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // Reset showToast after displaying the toast
            setShowToast(false);
        }
    }, [showToast]);

    return (
        <div className="signin-page d-flex justify-content-center align-items-center">
            <Container className="signin-container">
                <Row>
                    <Col lg="6" className="Side-section d-none d-md-flex align-items-center justify-content-center">
                        <h1 className="signup-title">SIGN-IN</h1>
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
                                            type="text"
                                            placeholder="Username or Email"
                                            className="form__input"
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                        />
                                        {formErrors.identifier && <span className="error">{formErrors.identifier}</span>}
                                    </div>
                                    <div className="form__group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="form__input"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {formErrors.password && <span className="error">{formErrors.password}</span>}
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
            {/* Render ToastContainer for notifications */}
            <ToastContainer />
        </div>
    );
};

export default Signin;
