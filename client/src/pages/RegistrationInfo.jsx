import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../compoents/Navbar';
import Loader from '../compoents/Loader';

const RegistrationInfo = () => {
    const [registerId, setRegisterId] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setRegisterId(e.target.value);
    };

    const handleFetchData = async () => {
        setLoading(true);
        setError('');
        setUserData(null);

        try {
            const response = await axios.post(`${process.env.REACT_APP_HOST_SERVER}user/get/registeration`,{SID:registerId});
            setUserData(response.data);
        } catch (err) {
            console.log(err)
            setError('Unable to fetch data. Please check the ID and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Search Now With ID</h2>

                <div className="mb-6">
                    <label htmlFor="registerId" className="block text-gray-700 mb-2">
                        Enter Register ID:
                    </label>
                    <input
                        type="text"
                        id="registerId"
                        value={registerId}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                        placeholder="Enter Registration ID"
                    />
                    <button
                        onClick={handleFetchData}
                        className="mt-4 px-6 py-2 bg-lime-500 text-white rounded-md hover:bg-lime-600 transition w-full"
                    >
                        Search
                    </button>
                </div>

                {loading && <Loader />}

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {userData && (
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-gray-700">Name:</label>
                            <input
                                type="text"
                                value={userData.name}
                                disabled
                                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                value={userData.email}
                                disabled
                                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">ID:</label>
                            <input
                                type="text"
                                value={userData.SID}
                                disabled
                                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Mother's Name:</label>
                            <input
                                type="text"
                                value={userData.motherName}
                                disabled
                                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Birth Date:</label>
                            <input
                                type="date"
                                value={userData.birthDate}
                                disabled
                                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Status:</label>
                            <input
                                type="text"
                                value={userData.status.toUpperCase()}
                                disabled
                                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                            />
                        </div>

                        {userData.status === 'rejected' && (
                            <div>
                                <label className="block text-gray-700">Reason:</label>
                                <input
                                    type="text"
                                    value={userData.rejectedResoan}
                                    disabled
                                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegistrationInfo;
