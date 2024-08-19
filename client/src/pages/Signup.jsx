import { useState } from "react";
import axios from "axios";
import upload from "../asset/images/upload.webp";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../compoents/Navbar";
import Loader from "../compoents/Loader";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Make sure to install react-icons

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fileimg, setFileimg] = useState('');
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate('')
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible((prevState) => !prevState);
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImg(URL.createObjectURL(file));
        setFileimg(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setSuccess('');

        // Validation
        const newErrors = {};
        const nameRegex = /^[a-zA-Z\s]{3,50}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

        if (!nameRegex.test(name)) {
            newErrors.name = 'Please enter a valid name (3-50 characters, letters and spaces only).';
        }

        if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 6 characters long and contain both letters and numbers.';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        if (!birthDate) {
            newErrors.birthDate = 'please enter a birth Date.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('birthDate', birthDate);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        if (fileimg) {
            formData.append('profileImage', fileimg);
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/students`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate(`/verification/${email}`)
            setSuccess('Signup successful!');
            setName('');
            setEmail('');
            setBirthDate('');
            setPassword('');
            setConfirmPassword('');
            setFileimg('');
            setImg('');
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
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                {
                                    img ?
                                        <img src={img} className="w-24 h-24 rounded-full m-auto hover:cursor-pointer" />
                                        :
                                        <img src={upload} className="w-24 h-24 rounded-full m-auto hover:cursor-pointer" />
                                }
                            </label>
                            <input id="file-input" type="file" className="hidden" onChange={handleImageChange} />
                        </div>
                        <h1 className="mt-3 text-xl md:text-2xl">Signup Now</h1>
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
                                {errors.password && <div className="text-red-500">{errors.password}</div>}
                            </div>
                            <div className="form-group w-[75%] m-auto mt-4">
                                <label className="md:text-xl">Confirm Password</label>
                                <div className="relative">
                                    <input
                                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                                        className="w-full py-3 px-4 mt-2 bg-gray-200 pr-10"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        value={confirmPassword}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                                    >
                                        {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
                                <h1 className="mt-2">Have an account <Link className="text-blue-800" to={'/signin'}>Login</Link></h1>
                            </div>
                            <div className="form-group w-[75%] m-auto mt-6 text-center">
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-black w-[50%] text-white rounded-md mx-4 hover:bg-slate-400 duration-200"
                                    disabled={loading}
                                >
                                    Signup
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
