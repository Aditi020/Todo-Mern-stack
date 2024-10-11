import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPsw.css';

const ForgotPsw = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const submitHandler = (e) => {
        e.preventDefault();

        // Validate email format
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return; // Stop submission if validation fails
        }

        // Reset error and proceed with form submission
        setError('');
        setMessage('Password reset link has been sent to your email.');

        // Here, you would typically handle the password reset link sending logic
        // e.g., make an API call to send the reset link
    };

    return (
        <div className="forgotpsw-page d-flex justify-content-center align-items-center">
            <div className="forgotpsw-container">
                <h2 className="forgotpsw-title">Forgot Password</h2>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="forgotpsw-message">{message}</p>}
                <form onSubmit={submitHandler}>
                    <div className="forgotpsw-group">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="forgotpsw-input"
                        />
                    </div>
                    <button type="submit" className="forgotpsw-btn">Send Reset Link</button>
                </form>
                <p className="form__text">
                    <Link to="/signin" className="redirect-link">
                        Back to Login?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPsw;
