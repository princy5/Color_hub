import axios from '../utils/axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import NoAuthRequired from '../middleware/noAuthRequired';
import { ReactComponent as Logo } from "../assets/colorly-01.svg"

const Login = () => {
    let navigate = useNavigate();
    const { setToken } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const validFieldValues = (email, password) => {
        if (email === "" || password === "")
            return false;
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            return false;
        return true;
    }

    const login = () => {
        if (validFieldValues(email, password)) {
            const loginData = {
                email: email,
                password: password
            };

            axios.post("/auth/login", loginData)
                .then((res) => {
                    setToken(res.data.token);
                    toast.success("Successfully logged in...");
                    navigate("/");
                })
                .catch((err) => {
                    toast.error(err.response.data);
                })
        } else {
            toast.error("Invalid input field values!");
        }
    }

    return (
        <NoAuthRequired>
            <div className="auth-page">
                <div className="auth-card">
                    <div
                        className="auth-logo-container"
                        onClick={() => navigate("/")}
                    >
                        <Logo className="auth-logo" />
                    </div>
                    <div className="auth-header">Login</div>
                    <input 
                        type="email"
                        placeholder="Email Address"
                        onChange={handleEmailChange}
                        value={email}
                        className="auth-input"
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        value={password}
                        className="auth-input"
                    />
                    <button 
                        type="submit"
                        onClick={login}
                    >
                        Login
                    </button>
                    <div className="auth-card-text">Not registered yet? <a onClick={() => navigate("/register")}>Register</a></div>
                </div>
            </div>
        </NoAuthRequired>
    )
}

export default Login
