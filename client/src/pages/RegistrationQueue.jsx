import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationQueue = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_HOST_SERVER}user/get/register`);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setError('Failed to load students.');
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Queue</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead className="bg-lime-500 text-white">
                        <tr>
                            <th className="w-1/4 py-2 px-4">Student Name</th>
                            <th className="w-1/4 py-2 px-4">Email</th>
                            <th className="w-1/4 py-2 px-4">Birth Date</th>
                            <th className="w-1/4 py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="text-gray-700 text-center">
                                <td className="py-2 px-4 border">{student.name}</td>
                                <td className="py-2 px-4 border">{student.email}</td>
                                <td className="py-2 px-4 border">{student.birthDate}</td>
                                <td className="py-2 px-4 border">{student.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RegistrationQueue;
