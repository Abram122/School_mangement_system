import AboutSchool from "../compoents/AboutSchool";
import Landing from "../compoents/Landing";
import Navbar from "../compoents/Navbar";
import { useState } from "react";
import VideoSection from "../compoents/VideoSection";
export default function Home() {
    return (
        <div className="home">
            <Navbar/>
            <Landing />
            <AboutSchool />
            <VideoSection/>
        </div>
    );
}