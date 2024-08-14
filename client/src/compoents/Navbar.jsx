import React, { useState } from 'react';
import { FaHome, FaBook, FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full  top-0  z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-lime-500 text-3xl font-bold">
                    <Link to={'/'}>
                        Abram King
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 hover:text-lime-500 focus:outline-none"
                    onClick={toggleMobileMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8 items-center">
                    <Link
                        to={'/'}
                        className="text-gray-700 hover:text-lime-500 transition-colors duration-300 flex items-center"
                    >
                        <FaHome className="mr-2" /> Home
                    </Link>
                    <Link
                        to={'/contact'}
                        className="text-gray-700 hover:text-lime-500 transition-colors duration-300 flex items-center"
                    >
                        <FaBook className="mr-2" /> Contact Us
                    </Link>
                    <Link
                        to={''}
                        className="text-gray-700 hover:text-lime-500 transition-colors duration-300 flex items-center"
                    >
                        <FaBell className="mr-2" /> Notifications
                    </Link>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-4">
                    <Link
                        to={'/profile'}
                        className="text-gray-700 hover:text-lime-500 transition-colors duration-300"
                    >
                        <FaUserCircle className="text-2xl" />
                    </Link>
                    <div className="hidden md:block">
                        <Link to={'/profile'}>
                        <span className="text-gray-700">Hello, User</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 bg-white shadow-lg transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-end p-4">
                    <button
                        className="text-gray-700 hover:text-lime-500"
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="flex flex-col items-center space-y-4 mt-8">
                    <Link
                        to={'/'}
                        className="text-gray-700 hover:text-lime-500 transition-colors duration-300 flex items-center"
                    >
                        <FaHome className="mr-2" /> Home
                    </Link>
                    <Link
                        to={'/contact'}
                        className="text-gray-700 hover:text-lime-500 transition-colors duration-300 flex items-center"
                    >
                        <FaBook className="mr-2" /> Contact Us
                    </Link>
                    <Link
                        to={'/'}
                        className="text-gray-700 hover:text-lime-500 transition-colors duration-300 flex items-center"
                    >
                        <FaBell className="mr-2" /> Notifications
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
