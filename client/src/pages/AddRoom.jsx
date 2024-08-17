import React, { useState } from 'react';
import axios from 'axios';

const AddRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic validation
        if (roomName.length < 3 || roomName.length > 50) {
            setError('Room name must be between 3 and 50 characters.');
            setLoading(false);
            return;
        }

        if (teacherName.length < 3 || teacherName.length > 50) {
            setError('Teacher name must be between 3 and 50 characters.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/room`, { roomName, roomTeacher: teacherName });
            alert('Room added successfully!');
            setRoomName('');
            setTeacherName('');
        } catch (error) {
            console.error('Error adding room:', error);
            setError('Failed to add room.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Room</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Room Name</label>
                    <input
                        type="text"
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter room name"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Teacher Name</label>
                    <input
                        type="text"
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter teacher name"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                <button
                    type="submit"
                    className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={loading}>
                    {loading ? 'Adding...' : 'Add Room'}
                </button>
            </form>
        </div>
    );
};

export default AddRoom;
