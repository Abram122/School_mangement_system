import React, { useState } from 'react';
import AddAdmin from './AddAdmin';
import RegistrationQueue from './RegistrationQueue';
import AddRoom from './AddRoom';
import RoomDisplay from './RoomDisplay';
const AdminDashboard = () => {
    const [selectedPage, setSelectedPage] = useState('AddAdmin');

    const renderContent = () => {
        switch (selectedPage) {
            case 'AddAdmin':
                return <AddAdmin />;
            case 'RegistrationQueue':
                return <RegistrationQueue />;
            case 'AddRoom':
                return <AddRoom />;
            case 'RoomDisplay':
                return <RoomDisplay />;
            default:
                return <AddAdmin />;
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
                            onClick={() => setSelectedPage('AddAdmin')}
                            className={`block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none ${selectedPage === 'AddAdmin' ? 'bg-lime-600' : ''}`}>
                            Add Admin
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
                            className={`block w-full text-left px-6 py-3 hover:bg-lime-600 focus:outline-none ${selectedPage === 'AddRoom' ? 'bg-lime-600' : ''}`}>
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
