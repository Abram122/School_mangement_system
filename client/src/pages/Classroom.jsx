import { useState } from "react";
import axios from 'axios';
import Navbar from "../compoents/Navbar";
import img from '../asset/images/contact.png';

const Classroom = () => {
    const [code, setCode] = useState('');
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleJoinClassroom = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/room`, { roomCode:code });
            setRoom(response.data);
            if (response.data.length === 0) {
                setError('Failed to get classroom. Please check the code and try again.');
            }
        } catch (error) {
            setError('Failed to get classroom. Please check the code and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Navbar />
            <div className="flex flex-col items-center justify-center h-full pt-16 px-4 mt-5">
                {/* Welcome Section */}
                <div className="text-center max-w-3xl mb-16">
                    <h1 className="text-4xl font-extrabold mb-4 text-lime-500">Join Your Classroom</h1>
                    <p className="text-lg text-gray-700">
                        Enter the classroom code to stay connected with your teacher and classmates. Explore available classrooms below.
                    </p>
                </div>

                {/* Classroom Code Input */}
                <div className="w-full max-w-md mb-8">
                    <label className="block text-xl font-semibold mb-2 text-lime-500">
                        Classroom Code
                    </label>
                    <input
                        type="text"
                        className="w-full py-3 px-4 text-gray-900 rounded-lg shadow-lg bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-lime-500"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                        placeholder="Enter The Classroom Code"
                        required
                    />
                    <button
                        onClick={handleJoinClassroom}
                        className="mt-4 w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Joining...' : 'Join Classroom'}
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>

                {/* Room Details */}
                {
                    room && room.map((room) => (
                        <div className="bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden w-full max-w-md mb-8">
                            <img src={img} alt="Classroom" className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-bold mb-2">{room.roomName}</h2>
                                <p className="text-gray-700 mb-4">Teacher: {room.roomTeacher}</p>
                                <button className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300">
                                    Join Classroom Now !
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Classroom;
