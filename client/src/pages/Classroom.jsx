import { useEffect, useState } from "react";
import axios from 'axios';
import img from '../asset/images/contact.png';
import { useNavigate } from "react-router-dom";
import Navbar from "../compoents/Navbar";

const Classroom = () => {
    const [code, setCode] = useState('');
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate('');
    const refreshToken = sessionStorage.getItem('refreshToken');

    const fetchStudentData = async () => {
        try {
            setLoader(true);
            if (!refreshToken) {
                navigate('/signin');
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/student`, { refreshToken });
            if (response.data.message === "User found!") {
                setData(response.data.user.rooms);
                fetchRooms(response.data.user.rooms);
                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            sessionStorage.removeItem('refreshToken');
            navigate('/signin');
        }
    };

    const fetchRooms = async (roomCodes) => {
        try {
            const roomDetails = await Promise.all(
                roomCodes.map(async (roomCode) => {
                    const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/room`, { roomCode });
                    return response.data;
                })
            );
            setRooms(roomDetails);
        } catch (error) {
            setError('Failed to load classrooms. Please try again.');
        }
    };

    const handleGetClassroom = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/room`, { roomCode: code });
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

    const handleJoinClassroom = async (id, code) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/room/student`, { roomId: id, refreshToken });
            if (response.data) {
                navigate('/classroom/' + code);
            }
            if (response.data.length === 0) {
                setError('Failed to join classroom. Please check the code and try again.');
            }
        } catch (error) {
            console.log(error);
            setError('Failed to join classroom. Please check the code and try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Navbar />
            <div className="container mx-auto py-16 px-4">
                {/* Welcome Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold mb-4 text-lime-500">Join Your Classroom</h1>
                    <p className="text-lg text-gray-700">
                        Enter the classroom code to stay connected with your teacher and classmates. Explore available classrooms below.
                    </p>
                </div>

                {/* Classroom Code Input */}
                <div className="w-full max-w-lg mx-auto mb-12">
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
                        onClick={() => handleGetClassroom(code)}
                        className="mt-4 w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Joining...' : 'Get Classroom'}
                    </button>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>

                {/* Display Single Classroom */}
                {room && room.length > 0 && (
                    <div className="w-full max-w-lg mx-auto mb-16">
                        {room.map((room, index) => (
                            <div key={index} className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden mb-6">
                                <img src={img} alt="Classroom" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2">{room.roomName}</h2>
                                    <p className="text-gray-700 mb-4">Teacher: {room.roomTeacher}</p>
                                    <p className="text-gray-700 mb-4">Room Code: {room.roomCode}</p>
                                    <button
                                        onClick={() => handleJoinClassroom(room._id, room.roomCode)}
                                        className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                                    >
                                        Go to Classroom Now!
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Display All Classrooms */}
                <div>
                    <h1 className="text-3xl font-bold text-center text-lime-500 mb-8">Your Classrooms</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.length === 0 ? (
                            <p className="text-gray-700 text-center col-span-full">No classrooms found.</p>
                        ) : (
                            rooms.map((room, index) => (
                                <div key={index} className="bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden">
                                    <img src={img} alt="Classroom" className="w-full h-48 object-cover" />
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-2">{room[0].roomName}</h2>
                                        <p className="text-gray-700 mb-4">Teacher: {room[0].roomTeacher}</p>
                                        <p className="text-gray-700 mb-4">Room Code: {room[0].roomCode}</p>
                                        <button
                                            onClick={() => handleJoinClassroom(room._id, room.roomCode)}
                                            className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300"
                                        >
                                            Go to Classroom Now!
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Classroom;
