import React, { useState } from 'react';
import axios from 'axios';

const GetRoomsByTeacher = () => {
    const [teacherName, setTeacherName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchRooms = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/get/room/teacher`, { roomTeacher: teacherName });
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setError('Failed to fetch rooms.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Rooms by Teacher</h2>
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
                onClick={handleFetchRooms}
                className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={loading}>
                {loading ? 'Fetching...' : 'Get Rooms'}
            </button>

            <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Rooms:</h3>
                {rooms.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-3">
                        {rooms.map((room) => (
                            <li key={room._id}>
                                <strong>Room Name:</strong> {room.roomName} <br />
                                <strong>Room Code:</strong> {room.roomCode}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No rooms found for this teacher.</p>
                )}
            </div>
        </div>
    );
};

export default GetRoomsByTeacher;
