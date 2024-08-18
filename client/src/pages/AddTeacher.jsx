import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../compoents/Loader';

const AddTeacher = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/add/teacher`, { teacherEmail: email, teacherPassword: password });
            setSuccess('Teacher added successfully!');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Error adding teacher:', error);
            if (error.response && error.response.data && error.response.data.errors) {
                setError(error.response.data.errors.join(', '));
            } else {
                setError('Failed to add teacher. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader />
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Teacher</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Teacher Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter teacher email"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                            <input
                                type="text"  
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                        {success && <p className="text-green-500 text-xs italic mb-4">{success}</p>}
                        <button
                            type="submit"
                            className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={loading}>
                            {loading ? <Loader /> : 'Add Teacher'}
                        </button>
                    </form>
                </>
            )}
        </div>
    );
};

export default AddTeacher;
