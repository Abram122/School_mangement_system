import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../compoents/Navbar";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Make sure to install react-icons
export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            console.log('sss',`${process.env.REACT_APP_HOST_SERVER}user/login`)
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/login`, { email, password }, { withCredentials: true });

            // Handle successful login
            // Store token in localStorage or sessionStorage if needed
            localStorage.setItem('token', response.data.token);

            // Navigate to a different page, e.g., dashboard
            navigate('/dashboard');
        } catch (err) {
            setLoading(false);

            if (err.response) {
                console.log(err)
                if (err.response.status === 400) {
                    setError('Invalid email or password.');
                } else if (err.response.status === 404) {
                    setError('Email not found.');
                } else {
                    setError('An error occurred. Please try again later.');
                }
            } else {
                setError('Network error. Please check your connection.');
            }
        }
    };

    return (
        <div className="py-3">
            <Navbar />
            <div className="signup w-[90%] mt-20 m-auto shadow-lg min-h-[90vh]">
                <div className="header bg-lime-500 text-white text-center py-4">
                    <h1 className="mt-3 text-xl md:text-2xl">Welcome Back</h1>
                    <h1 className="mt-3 text-xl md:text-2xl">Login Now</h1>
                </div>
                <div className="body">
                    <form className="form py-3" onSubmit={handleLogin}>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Email</label>
                            <input
                                type="email"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => { setEmail(e.target.value) }}
                                value={email}
                                required
                            />
                        </div>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Password</label>
                            <div className="relative">
                                <input
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    className="w-full py-3 px-4 mt-2 bg-gray-200 pr-10"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                                >
                                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <h1 className="mt-2">Do not have an account? <Link className="text-blue-800" to={'/signup'}>Sign Up</Link></h1>
                        </div>
                        {error && (
                            <div className="form-group w-[75%] m-auto mt-4">
                                <p className="text-red-600">{error}</p>
                            </div>
                        )}
                        <div className="form-group w-[75%] m-auto mt-6 text-center">
                            <button
                                type="submit"
                                className="py-2 px-6 bg-black w-[50%] text-white rounded-md mx-4 hover:bg-slate-400 duration-200"
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
