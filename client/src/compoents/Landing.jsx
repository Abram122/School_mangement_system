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
            }, 3000); // Change image every 3 seconds

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
        <div className="relative mt-20 h-[8ovh]">
            <div className="absolute inset-0 flex flex-wrap items-center justify-center ">
                <div className="bg-black bg-opacity-50  backdrop-blur-sm text-white text-center p-7 z-10 w-fit">
                <h1 className="text-2xl font-bold text-center mb-8">Welcome To Abram's School</h1>
                <div className="flex flex-wrap justify-center gap-4 ">
                        <div>
                            <Link to={'/signin'}>
                                <button className="py-2 px-6 bg-black text-white rounded-md mx-4 hover:bg-slate-400 duration-300 w-36">Login</button>
                            </Link>
                    </div>
                    <div>
                        <a href="#about-us">
                            <button className="py-2 px-6 bg-black text-white rounded-md mx-4 hover:bg-slate-400 duration-300 w-36">About Us</button>
                        </a>
                    </div>
                </div>
                </div>
            </div>
            <div
                className="overflow-hidden relative h-[88vh] "
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="object-fill w-full h-full"
                        />
                    </div>
                ))}

                {/* Controls */}
                <button
                    onClick={handlePrevClick}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                    &#9664;
                </button>
                <button
                    onClick={handleNextClick}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                    &#9654;
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full ${index === currentIndex
                                ? "bg-white"
                                : "bg-gray-400 bg-opacity-50 hover:bg-opacity-75"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AutoFadeCarousel;
