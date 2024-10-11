import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Button from 'react-bootstrap/esm/Button';

const Home = () => {
    return (
        <div className='home d-flex justify-content-center align-items-center'>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className='text-center'>Organize your <br /> work and life, easily.</h1>
                <p>Become focused, organized, and calm with<br /> Todo app The World's #1 task manager app.</p>
                <Button as={Link} to="/todo" className='Home-btn' style={{ backgroundColor:"#e84a5f" , borderStyle:"none"}}>
                    Create Todo
                </Button>
            </div>
        </div>
    );
};

export default Home;
