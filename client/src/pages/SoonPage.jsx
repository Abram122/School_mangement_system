import React from "react";
import Navbar from "../compoents/Navbar";

const SoonPage = () => {
    return (
        <div className="bg-gray-900 text-white flex items-center justify-center h-screen">
            <Navbar/>
            <div className="text-center">
                <h1 className="text-5xl font-bold text-lime-500 mb-4">
                    Something Great is Coming Soon!
                </h1>
                <p className="text-xl mb-8">
                    We're working hard to bring you an amazing experience. Stay tuned!
                </p>
                <div className="mt-10 flex justify-center space-x-4">
                    <a
                        href="https://www.facebook.com/abraham.mina.927/"
                        className="text-lime-500 hover:text-lime-400 transition duration-300"
                    >
                        Facebook
                    </a>
                    <a
                        href="https://www.linkedin.com/in/abram-mina-191a9a22a/"
                        className="text-lime-500 hover:text-lime-400 transition duration-300"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SoonPage;
