import { useEffect, useState } from "react";
import axios from 'axios';
import img from '../asset/images/contact.png';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const MyRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const refreshToken = sessionStorage.getItem('token');

    const fetchTeacherData = async () => {
        try {
            setLoader(true);
            if (!refreshToken) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to verify teacher. Please log in again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/admin/login');
                });
                return;
            }
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/teacher/verify`, { refreshToken });
            if (response.data.message === "Teacher found!") {
                setData(response.data.teacher.rooms);
                fetchRooms(response.data.teacher.rooms);
                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
            sessionStorage.removeItem('token');
            Swal.fire({
                title: 'Error!',
                text: 'Failed to verify teacher. Please log in again.',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/admin/login');
            });
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

    useEffect(() => {
        fetchTeacherData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <div className="container mx-auto py-16 px-4">
                {loader ? (
                    <div className="flex justify-center items-center">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-lime-500"></div>
                    </div>
                ) : (
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
                                                onClick={() => navigate('/classroom/' + room[0].roomCode)}
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
                )}
            </div>
        </div>
    );
};

export default MyRooms;
