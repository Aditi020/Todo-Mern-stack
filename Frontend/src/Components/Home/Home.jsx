import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Button from 'react-bootstrap/esm/Button';

const Home = () => {
    return (
        <div className='home d-flex justify-content-center align-items-center'>
            <div className="container d-flex justify-content-center align-items-center flex-column">
                <h1 className='text-center'>Unite Thoughts<br />& Visual Planning</h1>
                <p>TaskScribe's hybrid interface merges structured task management<br />
                    with creative canvas tools for comprehensive productivity</p>
                <Button as={Link} to="/todo" className='Home-btn' style={{ backgroundColor:"#e84a5f" , borderStyle:"none"}}>
                    Start Creating
                </Button>
            </div>
        </div>
    );
};

export default Home;
