import React, { useState } from "react";
import axios from "axios";
import Navbar from "../compoents/Navbar";
import ContactImg from '../asset/images/contact.png';
import Loader from "../compoents/Loader";

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Regex patterns
    const nameRegex = /^[a-zA-Z\s]{3,50}$/; // Allows letters and spaces, length between 3 and 50
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email regex
    const messageRegex = /^.{10,1000}$/; // Any character, length between 10 and 1000

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Validation
        if (!nameRegex.test(name)) {
            setError('Please enter a valid name (3-50 characters, letters and spaces only).');
            setLoading(false);
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        if (!messageRegex.test(message)) {
            setError('Message must be between 10 and 1000 characters.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/contact`, {
                name,
                email,
                message,
            });

            setSuccess('Your message has been sent successfully!');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setError('Failed to send your message. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact">
            <Navbar />
            {loading ? <Loader text="Sending..." /> :
                <div className={`w-[90%] mt-20 m-auto shadow-lg ${loading ? 'opacity-50' : ''}`}>
                    <div className="header bg-black text-white text-center py-4 w-full m-auto">
                        <h1 className="text-2xl text-center">Contact Us</h1>
                    </div>
                    <div className="mt-3">
                        <img src={ContactImg} alt="contact_image" className="w-[50vh] h-[45vh] m-auto" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group w-[65%] m-auto mt-4">
                            <label className="md:text-xl">User Name</label>
                            <input
                                type="text"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group w-[65%] m-auto mt-4">
                            <label className="md:text-xl">Email</label>
                            <input
                                type="email"
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group w-[65%] m-auto mt-4">
                            <label className="md:text-xl">Message</label>
                            <textarea
                                className="w-full py-3 px-4 mt-2 bg-gray-200"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        {success ? (
                            <div className="text-green-500 text-center mt-4">{success}</div>
                        ) : (
                            <div className="form-group w-[75%] m-auto mt-6 mb-3 text-center">
                                <button
                                    type="submit"
                                    className="py-2 px-6 bg-black w-[50%] text-white rounded-md mx-4 hover:bg-slate-400 duration-200"
                                    disabled={loading}
                                >
                                    Send
                                </button>
                            </div>
                        )}
                        {error && <div className="text-red-500 text-center mt-4 mb-4">{error}</div>}
                    </form>
                </div>
            }
        </div>
    );
};

export default Contact;
