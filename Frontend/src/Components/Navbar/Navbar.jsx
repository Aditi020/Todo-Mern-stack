import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FcTodoList } from "react-icons/fc";
import { Link } from 'react-router-dom'; // Importing Link for routing
import "./Navbar.css";
import user from "../../Assets/user.png";

function CustomNavbar() {
    return (
        <Navbar expand="lg" >
            <Container>
                <Navbar.Brand as={Link} to="/" className="Nav-icon">
                    <FcTodoList size={30}

                        style={{ marginRight: '12px', filter: "invert(47%) sepia(85%) saturate(326%) hue-rotate(327deg) brightness(95%) contrast(101%)" }} />
                    <b>&nbsp; QuickList</b>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" style={{ border: "none" }} />
                <Navbar.Collapse id="navbarScroll" >
                    <Nav className="ms-auto my-2 my-lg-0 "
                        style={{ maxHeight: '100px', fontSize: "18px", border: "none" }} >

                        <Nav.Link as={Link} to="/home" className="NavLin mx-1">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" className="NavLin mx-1">
                            About us
                        </Nav.Link>
                        <Nav.Link as={Link} to="/todo" className="NavLin mx-1">
                            Todo
                        </Nav.Link>

                        <Nav.Link as={Link} to="/signup"  className="mx-1">
                            <Button className='nav-btn'>
                                Signup
                            </Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signin"  className="mx-1">
                            <Button className='nav-btn'>
                                Signin
                            </Button>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/logout"  className="mx-1">
                            <Button className='nav-btn'>
                                Logout
                            </Button>
                        </Nav.Link>

                        <Nav.Link>
                            <img src={user} alt='User' />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;
