import { useState } from "react";
import axios from "axios";
import upload from "../asset/images/upload.webp";
import { Link } from "react-router-dom";
import Navbar from "../compoents/Navbar";
import Loader from "../compoents/Loader";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Make sure to install react-icons

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ID, setID] = useState('');
    const [motherName, setMotherName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess('');
        // Validation
        const newErrors = {};
        const nameRegex = /^[a-zA-Z\s]{3,50}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const IDRegex = /\d[14]/;

        if (!nameRegex.test(name)) {
            newErrors.name = 'Please enter a valid name (3-50 characters, letters and spaces only).';
        }

        if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!nameRegex.test(motherName)) {
            newErrors.motherName = 'Please enter a valid mother Name.';
        }

        if (!IDRegex.test(ID)) {
            newErrors.ID = 'Please enter a valid ID contain 14 numbers.';
        }
        if (!birthDate) {
            newErrors.birthDate = 'Please enter a BirthDate.';
        }

        if (Object.keys(newErrors).length > 0 ) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('birthDate', birthDate);
        formData.append('ID', ID);
        formData.append('motherName', motherName);
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/students`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess('Signup successful!');
            setName('');
            setEmail('');
            setBirthDate('');
            setID('');
            setMotherName('');
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data && err.response.data.error) {
                setErrors({ global: err.response.data.error });
            } else {
                setErrors({ global: 'Failed to create account. Please try again later.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-3">
            <Navbar />
            {loading ? <Loader text="Signing up..." /> :
                <div className="signup w-[90%] mt-20 m-auto shadow-lg min-h-[90vh]">
                    <div className="header bg-lime-500 text-white text-center py-4">
                        <h1 className="mt-3 text-xl md:text-3xl">Register Page</h1>
                        <h1 className="mt-3 text-xl md:text-2xl">Register Now</h1>
                    </div>
                    <div className="body">
                        <form className="form py-3" onSubmit={handleSubmit}>
                            <div className="form-group w-[75%] m-auto mt-4">
                                <label className="md:text-xl">User Name</label>
                                <input
                                    type="text"
                                    className={`w-full py-3 px-4 mt-2 bg-gray-200 ${errors.name ? 'border-red-500' : ''}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <div className="text-red-500">{errors.name}</div>}
                            </div>
                            <div className="form-group w-[75%] m-auto mt-4">
                                <label className="md:text-xl">Email</label>
                                <input
                                    type="email"
                                    className={`w-full py-3 px-4 mt-2 bg-gray-200 ${errors.email ? 'border-red-500' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="text-red-500">{errors.email}</div>}
                            </div>
                            <div className="form-group w-[75%] m-auto mt-4">
                                <label className="md:text-xl">Mother Name</label>
                                <input
                                    type="text"
                                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                                    value={motherName}
                                    onChange={(e) => setMotherName(e.target.value)}
                                />
                                {errors.motherName && <div className="text-red-500">{errors.motherName}</div>}
                            </div>
                            <div className="form-group w-[75%] m-auto mt-4">
                                <label className="md:text-xl">Birth Date</label>
                                <input
                                    type="date"
                                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                                {errors.birthDate && <div className="text-red-500">{errors.birthDate}</div>}
                            </div>                            
                            <div className="form-group w-[75%] m-auto mt-4">
                                <label className="md:text-xl">National ID</label>
                                <input
                                    type="number"
                                    className="w-full py-3 px-4 mt-2 bg-gray-200"
                                    value={ID}
                                    onChange={(e) => setID(e.target.value)}
                                />
                                {errors.ID && <div className="text-red-500">{errors.ID}</div>}
                            </div>                                                        
                            <div className="form-group w-[75%] m-auto mt-6 text-center">
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-black w-[50%] text-white rounded-md mx-4 hover:bg-slate-400 duration-200"
                                    disabled={loading}
                                >
                                    Register Now
                                </button>
                            </div>
                        </form>
                        {errors.global && <div className="text-red-500 text-center mt-4 mb-4">{errors.global}</div>}
                        {success && <div className="text-green-500 text-center mt-4 mb-4">{success}</div>}
                    </div>
                </div>
            }
        </div>
    );
}
