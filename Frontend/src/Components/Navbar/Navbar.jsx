import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FcTodoList } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Store/Slice/UserSlice'; // Ensure this import is correct
import "./Navbar.css";

function CustomNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('token') !== null;
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        console.log("Logging out..."); // Debugging log
        dispatch(logout());
        sessionStorage.clear();
        navigate('/'); // Redirect to the home route
        window.location.reload(); // Reload the application
    };

    const handleLinkClick = () => {
        setIsOpen(false); // Close the navbar on link click
    };

    console.log("Is Authenticated:", isAuthenticated); // Debugging log

    return (
        <Navbar expand="lg" className={`custom-navbar ${isOpen ? 'open' : ''}`}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="Nav-icon">
                    <FcTodoList size={30} style={{ marginRight: '12px', filter: "invert(47%) sepia(85%) saturate(326%) hue-rotate(327deg) brightness(95%) contrast(101%)" }} />
                    <b>&nbsp; QuickList</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleNavbar} style={{ border: "none" }} />
                <Navbar.Collapse id="navbarScroll" in={isOpen} className="flex-grow-0">
                    <Nav className="ms-auto my-2 my-lg-0" style={{ fontSize: "18px" }}>
                        <Nav.Link as={Link} to="/home" className="NavLin mx-1">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="NavLin mx-1">About Us</Nav.Link>
                        <Nav.Link as={Link} to="/todo" className="NavLin mx-1">Todo</Nav.Link>
                        {!isAuthenticated ? (
                            <Nav.Link as={Link} to="/signin" className="mx-1">
                                <Button className='nav-btn'>Sign In</Button>
                            </Nav.Link>
                        ) : (
                            <Nav.Link onClick={handleLogout} className="mx-1">
                                <Button className='nav-btn'>Logout</Button>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
