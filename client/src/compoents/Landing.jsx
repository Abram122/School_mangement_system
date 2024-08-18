import { useState, useEffect } from "react";
import img1 from '../asset/images/landing1.jpg';
import img2 from '../asset/images/landing2.jpg';
import img3 from '../asset/images/landing3.jpg';
import img4 from '../asset/images/landing4.jpg';
import { Link } from "react-router-dom";

const AutoFadeCarousel = () => {
    const images = [img1, img2, img3, img4];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 4000); 

            return () => clearInterval(interval);
        }
    }, [images.length, isPaused]);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="relative mt-20 h-[88vh]">
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="bg-black bg-opacity-50 backdrop-blur-md text-white text-center p-10 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold mb-6">Welcome to Abram's School</h1>
                    <p className="text-lg mb-8">Empowering students to achieve their full potential</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/signin">
                            <button className="py-3 px-8 bg-lime-500 text-black font-semibold rounded-md hover:bg-lime-600 transition duration-300 shadow-md">
                                Login
                            </button>
                        </Link>
                        <a href="#about-us">
                            <button className="py-3 px-8 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition duration-300 shadow-md">
                                About Us
                            </button>
                        </a>
                    </div>
                </div>
            </div>

            <div
                className="overflow-hidden relative h-full"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                ))}

                {/* Controls */}
                <button
                    onClick={handlePrevClick}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition duration-300 z-30"
                >
                    &#9664;
                </button>
                <button
                    onClick={handleNextClick}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 transition duration-300 z-30"
                >
                    &#9654;
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-4 h-4 rounded-full border-2 transition ${index === currentIndex
                                ? "bg-lime-500 border-lime-500"
                                : "bg-gray-400 border-gray-400 hover:bg-lime-500 hover:border-lime-500"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AutoFadeCarousel;
