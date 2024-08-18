import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RegistrationQueue = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [status, setStatus] = useState('');
    const [reason, setReason] = useState('');

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
    useEffect(() => {

        fetchStudents();
    }, []);

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        if (e.target.value !== 'rejected') {
            setReason('');
        }
    };

    const handleUpdate = async () => {
        if (selectedStudent) {
            try {
                await axios.put(`${process.env.REACT_APP_HOST_SERVER}user/update/registeration`, {
                    _id: selectedStudent._id, 
                    status,
                    reason: status === 'rejected' ? reason : undefined,
                });
                alert('Status updated successfully');
                setSelectedStudent(null); 
                setStatus('');
                setReason('');
                fetchStudents()
            } catch (error) {
                console.error('Error updating status:', error);
                alert('Failed to update status.');
            }
        }
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Queue</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
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
                                    <td className="py-2 px-4 border">
                                        {student.status === 'In Progress' ? (
                                            <>
                                                <select
                                                    value={selectedStudent?._id === student._id ? status : ''}
                                                    onChange={(e) => {
                                                        setSelectedStudent(student);
                                                        handleStatusChange(e);
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-md"
                                                >
                                                    <option value="" selected>In Progress</option>
                                                    <option value="accepted">Accepted</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                                {selectedStudent?._id === student._id && status === 'rejected' && (
                                                    <input
                                                        type="text"
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                        placeholder="Reason for rejection"
                                                        className="w-full mt-2 px-4 py-2 border rounded-md"
                                                    />
                                                )}
                                                {selectedStudent?._id === student._id && status && (
                                                    <button
                                                        onClick={handleUpdate}
                                                        className="mt-4 px-6 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition"
                                                    >
                                                        Update
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            student.status
                                        )}
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

export default RegistrationQueue;
