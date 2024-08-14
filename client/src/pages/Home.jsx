import AboutSchool from "../compoents/AboutSchool";
import Landing from "../compoents/Landing";
import Navbar from "../compoents/Navbar";
import { useState } from "react";
export default function Home() {
    return (
        <div className="home">
            <Navbar/>
            <Landing />
            <AboutSchool/>
        </div>
    );
}