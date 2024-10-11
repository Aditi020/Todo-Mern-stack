import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Todo from './Components/Todo/Todo';
import Signin from "./Components/User/Signin";
import Signup from "./Components/User/Signup";
import Forgot from "./Components/User/ForgotPsw";


const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<Forgot />} />

        </Routes>
    );
};

export default RouteConfig;
