import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPsw.css';

const ForgotPsw = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage('Password reset link has been sent to your email.');
    };

    return (
        <div className="forgotpsw-page d-flex justify-content-center align-items-center">
            <div className="forgotpsw-container">
                <h2 className="forgotpsw-title">Forgot Password</h2>
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
