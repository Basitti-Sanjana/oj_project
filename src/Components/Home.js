import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import img from '../images/whats-the-best-programming-language-to-learn-first.jpeg';

const Home = () => {
    const nav = useNavigate();

    return (
        <div className="container mt-5">
            <div className="jumbotron text-center text-white">
                <img src={img} alt="Programming Languages" style={{ width: '70%', height: 'auto' }} className="img-fluid mb-4" />
                <h1>Online Judge</h1>
                <p>Built with React, Node.js, Express, and Webpack.</p>
                <hr />
                <button onClick={() => nav('/editor')} className="btn btn-danger">Go To Questions</button>
            </div>
        </div>
    );
};

export default Home;
