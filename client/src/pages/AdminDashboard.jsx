import React, { useState } from 'react';
import AddTeacher from './AddTeacher';
import RegistrationQueue from './RegistrationQueue';
import AddRoom from './AddRoom';
import RoomDisplay from './RoomDisplay';
import Teacher from './Teachers';
const AdminDashboard = () => {
    const [selectedPage, setSelectedPage] = useState('AddAdmin');

    const renderContent = () => {
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
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-lime-500 text-white flex flex-col">
                <div className="p-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                </div>
                <div className="flex-grow">
                    <nav className="space-y-2">
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
