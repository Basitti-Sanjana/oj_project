import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const nav = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('UserData')) {
            nav('/');
        }
    });

    const handleClick = async () => {
        const data = {
            email,
            password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', data);
            const userData = response.data;
            
            toast.success('Login Success', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            localStorage.setItem('UserData', JSON.stringify(userData));
            
            // Check if the logged-in user is an admin
            if (userData.role === 'admin') {
                nav('/createQuestions'); // Redirect to admin user page
            } else {
                nav('/'); // Redirect to default page
            }

            window.location.reload(); // You may want to remove this line
            props.showAlert("Logged in Successfully","success");
        } catch (error) {
            toast.error(error.response.data.errors, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            props.showAlert("Invalid Credentials","danger");
        }
    };

    return (
        <div className="container mt-5">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <h1 className="text-white">Login</h1>
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    className="form-control"
                                    name="email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    className="form-control"
                                    name="password"
                                />
                            </div>
                            <button onClick={handleClick} className="btn btn-dark">
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
