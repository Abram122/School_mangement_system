import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../compoents/Navbar";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('admin'); 
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
        if (role === 'admin') {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_HOST_SERVER}admin/admin/login`,
                    { admin_name: email, admin_password:password },
                    { withCredentials: true }
                );
                sessionStorage.setItem('token', response.data.refreshToken);
                navigate('/admin/dashboard');
            } catch (err) {
                console.log(err)
                setLoading(false);
                if (err.response) {
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
        } else {
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_HOST_SERVER}admin/teacher/login`,
                    { teacherEmail: email, teacherPassword:password },
                    { withCredentials: true }
                );
                sessionStorage.setItem('token', response.data.refreshToken);
                navigate('/admin/dashboard');
            } catch (err) {
                console.log(err)
                setLoading(false);
                if (err.response) {
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
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/admin/dashboard')
        }
    },[])

    return (
        <div className="py-3">
            <Navbar />
            <div className="signup w-[90%] mt-20 m-auto shadow-lg min-h-[90vh]">
                <div className="header bg-lime-500 text-white text-center py-4">
                    <h1 className="mt-3 text-xl md:text-2xl">Welcome</h1>
                    <h1 className="mt-3 text-xl md:text-2xl">Login Now</h1>
                </div>
                <div className="body">
                    <form className="form py-3" onSubmit={handleLogin}>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Role</label>
                            <select
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="admin">Admin</option>
                                <option value="teacher">Teacher</option>
                            </select>
                        </div>
                        <div className="form-group w-[75%] m-auto mt-4">
                            <label className="md:text-xl">Email</label>
                            <input
                                type="email"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                onChange={(e) => setEmail(e.target.value)}
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
