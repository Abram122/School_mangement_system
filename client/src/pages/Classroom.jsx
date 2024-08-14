import { useState } from "react";
import Navbar from "../compoents/Navbar";
import img from '../asset/images/contact.png';

const Classroom = () => {
    const [code, setCode] = useState('');

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
                <div className="w-full max-w-md mb-16">
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
                </div>

                {/* Classrooms Grid */}
                <h1 className="text-3xl font-extrabold mb-8 text-lime-500">Explore Classrooms</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-6xl">
                    <div className="bg-white text-gray-900 rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105">
                        <img src={img} alt="Classroom" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-2">Classroom Name</h2>
                            <p className="text-gray-700 mb-4">Teacher: John Doe</p>
                            <button className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition-colors duration-300">
                                Go To Classroom
                            </button>
                        </div>
                    </div>
                    {/* Repeat Classroom Card as needed */}
                </div>
            </div>
        </div>
    );
};

export default Classroom;
