import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchTeachers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_HOST_SERVER}admin/get/teacher`);
            setTeachers(response.data);
            setFilteredTeachers(response.data);
        } catch (error) {
            console.error('Error fetching teachers:', error);
            setError('Failed to load teachers.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = teachers.filter((teacher) =>
            teacher.teacherEmail.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredTeachers(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_HOST_SERVER}admin/delete/teacher/${id}`);
                setTeachers(teachers.filter((teacher) => teacher._id !== id));
                setFilteredTeachers(filteredTeachers.filter((teacher) => teacher._id !== id));
            } catch (error) {
                console.error('Error deleting teacher:', error);
                setError('Failed to delete teacher.');
            }
        }
    };

    useEffect(() => {
        fetchTeachers();
    }, []);

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Teachers</h2>

            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by email..."
                className="mb-4 p-2 border border-gray-300 rounded w-full"
            />

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    <table className="min-w-full bg-white">
                        <thead className="bg-lime-500 text-white">
                            <tr>
                                <th className="w-1/4 py-2 px-4">#</th>
                                <th className="w-1/4 py-2 px-4">Email</th>
                                <th className="w-1/4 py-2 px-4">Password</th>
                                <th className="w-1/4 py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTeachers.map((teacher, index) => (
                                <tr key={teacher._id} className="text-gray-700 text-center">
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">{teacher.teacherEmail}</td>
                                    <td className="py-2 px-4 border">{teacher.teacherPassword}</td>
                                    <td className="py-2 px-4 border">
                                        <button
                                            onClick={() => handleDelete(teacher._id)}
                                            className="bg-red-500 hover:bg-red-600  text-white py-1 px-4 rounded focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Teachers;
