import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTeacher from './AddTeacher';
import RegistrationQueue from './RegistrationQueue';
import AddRoom from './AddRoom';
import RoomDisplay from './RoomDisplay';
import Teacher from './Teachers';
import axios from 'axios';

const AdminDashboard = () => {
    const [selectedPage, setSelectedPage] = useState('Welcome');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const fetchTeacherData = async () => {
        try {
            const refreshToken = sessionStorage.getItem('token');
            if (!refreshToken) {
                navigate('/admin/login');
                return false;
            }

            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/teacher/verify`, { refreshToken });
            if (response.data.message === "Teacher found!") {
                setRole('teacher');
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const fetchAdminData = async () => {
        try {
            const refreshToken = sessionStorage.getItem('token');
            if (!refreshToken) {
                navigate('/admin/login');
                return;
            }

            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}admin/admin/verify`, { refreshToken });
            if (response.data.message === "Admin found!") {
                setRole('admin');
            } else {
                navigate('/admin/login');
                sessionStorage.removeItem('token');
            }
        } catch (err) {
            console.error(err);
            navigate('/admin/login');
            sessionStorage.removeItem('token');
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const isTeacher = await fetchTeacherData();
            if (!isTeacher) {
                await fetchAdminData();
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setRole('');
        navigate('/admin/login');
    };

    const renderContent = () => {
        if (selectedPage === 'Welcome') {
            return <h2 className='text-2xl text-center text-lime-500'>Welcome {role === 'admin' ? 'Admin' : role === 'teacher' ? 'Teacher' : ''}</h2>;
        }
        switch (selectedPage) {
            case 'AddTeacher':
                return <AddTeacher />;
            case 'Teacher':
                return <Teacher />;
            case 'RegistrationQueue':
                return <RegistrationQueue />;
            case 'AddRoom':
                return <AddRoom />;
            case 'RoomDisplay':
                return <RoomDisplay />;
            default:
                return <AddTeacher />;
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <div className="w-full md:w-64 bg-lime-500 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-3xl font-bold">{role} Dashboard</h1>
                </div>
                <div className="flex-grow">
                    <nav className="space-y-2">
                        {role === 'admin' && (
                            <>
                                <button
                                    onClick={() => setSelectedPage('AddTeacher')}
                                    className={`block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none ${selectedPage === 'AddTeacher' ? 'bg-lime-600' : ''}`}>
                                    Add Teacher
                                </button>
                                <button
                                    onClick={() => setSelectedPage('Teacher')}
                                    className={`block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none ${selectedPage === 'Teacher' ? 'bg-lime-600' : ''}`}>
                                    Teachers
                                </button>
                                <button
                                    onClick={() => setSelectedPage('RegistrationQueue')}
                                    className={`block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none ${selectedPage === 'RegistrationQueue' ? 'bg-lime-600' : ''}`}>
                                    Registration Queue
                                </button>
                            </>
                        )}
                        {(role === 'admin' || role === 'teacher') && (
                            <>
                                <button
                                    onClick={() => setSelectedPage('AddRoom')}
                                    className={`block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none ${selectedPage === 'AddRoom' ? 'bg-lime-600' : ''}`}>
                                    Add Room
                                </button>
                                <button
                                    onClick={() => setSelectedPage('RoomDisplay')}
                                    className={`block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none ${selectedPage === 'RoomDisplay' ? 'bg-lime-600' : ''}`}>
                                    Room Display
                                </button>
                            </>
                        )}
                        {role && (
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none bg-red-600">
                                Logout
                            </button>
                        )}
                    </nav>
                </div>
            </div>

            <div className="flex-grow p-4 md:p-10">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
