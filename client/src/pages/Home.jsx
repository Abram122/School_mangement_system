import Navbar from "../compoents/Navbar";
import Landing from "../compoents/Landing";
import AboutSchool from "../compoents/AboutSchool";
import VideoSection from "../compoents/VideoSection";
import Footer from "../compoents/Footer";
import { useState } from "react";
export default function Home() {
    return (
        <div className="home">
            <Navbar/>
            <Landing />
            <AboutSchool />
            <VideoSection />
            <Footer />
        </div>
    );
}