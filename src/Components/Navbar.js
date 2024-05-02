import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const NavBar = (props) => {
    const [user, setUser] = useState();

    useEffect(() => {
        if (localStorage.getItem('UserData')) {
            setUser(JSON.parse(localStorage.getItem('UserData')));
        }
    }, []);
    const nav = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('UserData');
        setUser(null);
        nav('/');
        props.showAlert("Logged out Successfully","success");
        
    };
    // Check if the user is an admin
    const isAdmin = user && user.role === "admin";
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">OnlineJudge</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/questions">Questions</Link>
                            </li>
                            {user ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">Your Profile</Link>
                                    </li>
                                    {isAdmin && (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/createQuestions">Create Questions</Link>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/signup">Sign Up</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
