import React, { useState } from 'react';
import axios from 'axios';

const AddAdmin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admins', { email, password });
            alert('Admin added successfully!');
        } catch (error) {
            console.error('Error adding admin:', error);
            alert('Failed to add admin.');
        }
    };

    return (
        <div className="p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Admin</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Admin Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter admin email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button type="submit" className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Admin
                </button>
            </form>
        </div>
    );
};

const RegistrationQueue = () => (
    <div className="p-8 bg-white shadow-lg rounded-lg overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Queue</h2>
        <table className="min-w-full bg-white">
            <thead className="bg-lime-500 text-white">
                <tr>
                    <th className="w-1/4 py-2 px-4">Student Name</th>
                    <th className="w-1/4 py-2 px-4">Email</th>
                    <th className="w-1/4 py-2 px-4">Date Registered</th>
                    <th className="w-1/4 py-2 px-4">Status</th>
                </tr>
            </thead>
            <tbody>
                {/* Sample Row */}
                <tr className="text-gray-700">
                    <td className="py-2 px-4 border">John Doe</td>
                    <td className="py-2 px-4 border">john.doe@example.com</td>
                    <td className="py-2 px-4 border">08/16/2024</td>
                    <td className="py-2 px-4 border">Pending</td>
                </tr>
                {/* Add more rows as needed */}
            </tbody>
        </table>
    </div>
);

const AddRoom = () => {
    const [roomName, setRoomName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/rooms', { roomName });
            alert('Room added successfully!');
        } catch (error) {
            console.error('Error adding room:', error);
            alert('Failed to add room.');
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
                <button type="submit" className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Add Room
                </button>
            </form>
        </div>
    );
};

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
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-4 md:p-10">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
