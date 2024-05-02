import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const nav = useNavigate();

    const handleClick = async () => {
        const data = {
            name,
            email,
            password,
            role
        };

        await axios.post('http://localhost:5000/api/auth/createuser', data).then((response) => {
            toast.success('Signup Success', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            nav('/login');
            props.showAlert("Account created Successfully","success");
        }).catch((error) => {
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
            props.showAlert("Invalid details","danger");
        });
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
            <h1 className="text-white">Sign Up</h1>
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    name="name"
                                />
                            </div>
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
                            <div className="form-group my-2">
                                <label htmlFor="role">Role</label>
                                <select
                                    onChange={(e) => setRole(e.target.value)}
                                    className="form-control"
                                    name="role"
                                >
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button onClick={handleClick} className="btn btn-dark">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
