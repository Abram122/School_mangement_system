import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* About Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-lime-500 mb-4">About Us</h2>
                        <p className="text-gray-400">
                            We are committed to providing the best tools for managing schools,
                            from student enrollment to class management and beyond. Empower
                            your school with our comprehensive solution.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-lime-500 mb-4">Quick Links</h2>
                        <ul className="text-gray-400 space-y-2">
                            <li><Link to="/register" className="hover:text-lime-500 transition">Admissions</Link></li>
                            <li><Link to="/profile" className="hover:text-lime-500 transition">Profile</Link></li>
                            <li><Link to="/room" className="hover:text-lime-500 transition">Classrooms</Link></li>
                            <li><Link to="/contact" className="hover:text-lime-500 transition">Support</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-lime-500 mb-4">Contact Us</h2>
                        <p className="text-gray-400">Phone: +20 127 096 3278</p>
                        <p className="text-gray-400">Email: abrammina12@gmail.com</p>
                        <p className="text-gray-400">Address: 8 Alhaj Fawzy Abo Youssef</p>
                        <div className="mt-4 flex space-x-4">
                            <Link to="#" className="text-gray-400 hover:text-lime-500 transition">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-lime-500 transition">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-lime-500 transition">
                                <i className="fab fa-instagram"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-700 pt-8 text-center">
                    <p className="text-gray-500">&copy; 2024 School Management System. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
